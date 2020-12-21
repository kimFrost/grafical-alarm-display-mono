import React, { useState } from 'react';
import { useAPI } from '@kimfrost/shared';
import { Root } from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface IProps {
    id?: string
    onUploaded?: (data: any) => void
}

const ImageUploader: React.FC<IProps> = ({ id, onUploaded }) => {

    const [progress, setProgress] = useState<number>(0)
    const api = useAPI()

    return (
        <Root>
            <input type="file" accept="image/*" onChange={(e) => {
                e.persist();
                if (e.target && e.target.files) {
                    Array.from(e.target.files).forEach(file => {

                        // const reader = new FileReader();
                        // var url = reader.readAsDataURL(file);
                        // reader.onload = function () {
                        //     console.log(reader.result, url)
                        //     if (api) {
                        //         api.post('/crossorigin/SaveGraphicalDisplayImage', {
                        //             id: id,
                        //             parentId: id,
                        //             imageBase64: reader.result,
                        //             pathToImage: '',
                        //             fileExtension: file.type
                        //         }, {
                        //             onUploadProgress: e => {
                        //                 setProgress(e.loaded / e.total * 100);
                        //                 let progress = Math.round(
                        //                     e.loaded / e.total * 100) + '%';
                        //                 console.log('progress', progress)
                        //             }
                        //         })
                        //             .then(response => console.log(response))
                        //             .catch(error => console.log(error))
                        //     }
                        // };
                        // reader.onerror = function (error) {
                        //     console.log('Error: ', error);
                        // };

                        if (id && api) {
                            const formData = new FormData();

                            const ext = file.name.split('.').pop() || '';

                            formData.append('parentId', id);
                            formData.append('fileExtension', ext);
                            formData.append('image', file);

                            api.post('/crossorigin/SaveGraphicalDisplayImage', formData, {
                                onUploadProgress: e => {
                                    let progress = Math.round(
                                        e.loaded / e.total * 100) + '%';
                                    console.log('progress', progress)
                                    setProgress(e.loaded / e.total * 100);
                                }
                            }).then(res => {
                                console.log(res);
                                onUploaded && onUploaded(res.data);

                                // fileExtension: null
                                // id: "87e696db-d486-472e-824e-460fd859e994"
                                // imageBase64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD"
                                // parentId: "87e696db-d486-472e-824e-460fd859e994"
                                // pathToImage: "https://localhost:8083/Images/Location Alpha/Location Alpha.jpg"

                                // getFile({
                                //     name: res.data.name,
                                //     path: 'http://localhost:4500' + res.data.path
                                // })
                            }).catch(err => console.log(err))

                            // getFileFromInput(file)
                            //     .then((binary) => manageUploadedFile(binary, file))
                            //     .catch((reason) => {
                            //         console.log(`Error during upload ${reason}`);
                            //         e.target.value = ''; // to allow upload of same file if error occurs
                            //     })
                        }
                    });
                }

                // var file = e.target.files[0];
                // const reader = new FileReader();
                // var url = reader.readAsDataURL(file);

                // reader.onloadend = function (e) {
                //     this.setState({
                //         selectedFile: [reader.result]
                //     });
                // }.bind(this);
                // console.log(url); // Would see a path?

                // this.setState({
                //     mainState: "uploaded",
                //     selectedFile: e.target.files[0],
                //     imageUploaded: 1
                // });

            }} />

            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        progress
                    )}%`}</Typography>
                </Box>
            </Box>
            {/* <progress id="file" value={progress} max="100">{progress}%</progress> */}

            {/* <Select value={selectedLocation} variant="outlined" onChange={(e) => setSelectedLocation(e.target.value as any)}>
                        {locations.map(location => (
                            <MenuItem key={location.Id} value={location as any}>{location.Id}</MenuItem>
                        ))}
                    </Select> */}
        </Root>
    );
};

export default ImageUploader;
