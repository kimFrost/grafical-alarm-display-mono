import * as express from 'express';
import * as WebSocket from 'ws';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import { IAlarm, ILocation, IMessage, IZone, EAlarmType, EAlarmTypePriority } from '@kimfrost/shared';
import data from './data';

const fs = require('fs');
var cors = require('cors');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const getRandomEnumKey = (enumeration: any): any => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumKey;
}

const getRandomEnumValue = (enumeration: any) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(myEnum: T, enumValue: string): keyof T | null {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

// function randomEnum<T>(anEnum: T): T[keyof T] {
//     const enumValues = Object.keys(anEnum)
//         .map(n => Number.parseInt(n))
//         .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
//     const randomIndex = Math.floor(Math.random() * enumValues.length)
//     const randomEnumValue = enumValues[randomIndex]
//     return randomEnumValue;
// }


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        }
        else {
            cb(null, false)
        }
    }
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
// const upload = multer({ storage: storage }).single('file')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public');
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });


class Server {
    public static readonly PORT: number = 5002;
    private _app: express.Application;
    private server: http.Server;
    private io: WebSocket.Server;
    private port: string | number;
    private connections: WebSocket[];

    private alarms: IAlarm[];
    private zones: IZone[];
    private locations: ILocation[];

    constructor() {
        this.alarms = data.alarms || [];
        this.zones = data.zones || [];
        this.locations = data.locations || [];

        this._app = express();
        this.port = process.env.PORT || Server.PORT;
        this._app.use(express.static(path.join(__dirname, 'public')));
        this._app.use('/uploads', express.static('uploads'));
        this._app.use(cors());
        this._app.options('*', cors());

        // Simulate latency
        this._app.use((req, res, next) => {
            const delay = Math.floor(Math.random() * (2000 - 600 + 1)) + 600;
            setTimeout(next, delay)
        })

        this.server = http.createServer(this._app);
        this.io = new WebSocket.Server({ server: this.server });
        this.connections = [];

        this._app.route('/zones').post(jsonParser, (req, res) => {
            const data = req.body;
            this.zones = data;
            fs.writeFileSync(__dirname + '/public/zones.json', JSON.stringify(this.zones));
            res.status(200).send()
        })

        this._app.get("/zones", (req, res) => {
            // res.send({
            //     zones: this.zones
            // })
            res.json(this.zones)
            //res.sendFile(path.join(__dirname, "public", "index.html"));
        });

        this._app.route('/accept').post(jsonParser, (req, res) => {
            const data = req.body;
            this.acknowledgeAlarm(data.Id);
            res.status(200).send()
            //res.status(200).json()
            //res.status(500).end(error);
        })
        1
        this._app.route('/reject').post(jsonParser, (req, res) => {
            const data = req.body;
            this.removeAlarm(data.Id);
            res.status(200).send()
        })

        this._app.post('/upload', upload.single('image'), (req, res, next) => {
            try {
                console.log(req.file);
                res.send(req.file);
            } catch (err) {
                res.send(400);
            }
        })

        // this._app.post('/upload', (req, res) => {
        //     upload(req, res, (err: any) => {
        //         if (err) {
        //             res.sendStatus(500);
        //         }
        //         else {
        //             //res.send(req.file)
        //             res.json({ 'message': 'File uploaded successfully' });
        //         }
        //     })
        // })

        // this._app.post('/upload', upload.single('avatar'), (req, res, next) => {
        //     // const url = req.protocol + '://' + req.get('host')
        //     // const imageUrl = url + '/public/' + req.file.filename

        //     // let progress = 0;
        //     // let fileSize = req.headers['content-length'] ? parseInt(req.headers['content-length']) : 0;
        //     // req.on('data', (chunk) => {
        //     //     progress += chunk.length;
        //     //     res.write((`${Math.floor((progress * 100) / fileSize)} `));
        //     //     if (progress === fileSize) {
        //     //         console.log('Finished', progress, fileSize)
        //     //     }
        //     // });
        // })

        this.listen();
    }

    private listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connection', (ws) => {
            console.log('new connection')
            this.connections.push(ws)
            this.broadcast(ws, {
                type: 'ConnectionData',
                data: {
                    alarms: this.alarms,
                    locations: this.locations
                }
            })
            ws.onclose = (e) => {
                console.log('close connection', e.code)
            }
            ws.onmessage = (message) => {
                console.log('onmessage', message)
            }
        });

        const timer = setInterval(() => {
            if (this.alarms.length < 10) {
                this.triggerRandomAlarm()
            }
            // else {
            //     this.alarms.length = 0;
            //     this.triggerRandomAlarm()
            // }
        }, 5000)
    }

    private triggerRandomAlarm() {
        const randomZone = this.zones[Math.floor(Math.random() * this.zones.length)]
        const randomLocations = this.locations[Math.floor(Math.random() * this.locations.length)]
        const alarmTypeValue = getRandomEnumValue(EAlarmType);
        const alarmTypeKey = getEnumKeyByEnumValue(EAlarmType, alarmTypeValue);

        const newAlarm: IAlarm = {
            Id: `Alarm_${Math.floor(Math.random() * 100000)}`,
            ZoneId: '',
            ZoneText: '',
            Location: randomLocations.Id,
            UnitText: 'Afdeling 1',
            EquipmentPhysicalId: '',
            Type: alarmTypeValue,
            Priority: EAlarmTypePriority[alarmTypeKey] as any,
            Position: randomZone.Position,
            Acknowledged: false
        }
        this.alarms.push(newAlarm);
        this.alarms = this.alarms.sort((a, b) => b.Priority - a.Priority)

        this.broadcastAll({
            type: 'alarmsUpdated',
            data: {
                alarms: this.alarms,
                locations: this.locations
            }
        })
    }

    private acknowledgeAlarm(Id: string) {
        this.alarms = this.alarms.map(alarm => {
            if (alarm.Id === Id) {
                alarm.Acknowledged = true;
            }
            return alarm;
        })
        this.broadcastAll({
            type: 'alarmsUpdated',
            data: {
                alarms: this.alarms,
                locations: this.locations
            }
        })
    }

    private removeAlarm(Id: string) {
        this.alarms = this.alarms.filter(alarm => {
            return alarm.Id !== Id;
        })
        this.broadcastAll({
            type: 'alarmsUpdated',
            data: {
                alarms: this.alarms,
                locations: this.locations
            }
        })
    }

    private broadcast(connection: WebSocket, message: IMessage) {
        connection.send(JSON.stringify(message))
    }

    private broadcastAll(message: IMessage) {
        // Array.from(this.io.clients.entries()).map(client => {
        // }) 
        this.connections = this.connections.filter((connection) => {
            if (connection && connection.readyState === WebSocket.OPEN) {
                this.broadcast(connection, message);
            }
            else if (connection && connection.readyState === WebSocket.CLOSED) {
                return false;
            }
            else if (!connection) {
                return false;
            }
            return true;
        })
    }

    get app(): express.Application {
        return this._app;
    }
}

const app = new Server().app;
export { app }