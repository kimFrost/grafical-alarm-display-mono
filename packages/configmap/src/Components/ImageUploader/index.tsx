import React, { useState } from 'react';
import { useAPI } from '@kimfrost/shared';
import { Root } from './styles';

interface IProps {
    id?: string
}

const ImageUploader: React.FC<IProps> = ({ id }) => {

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

            <progress id="file" value={progress} max="100">{progress}%</progress>

            {/* <Select value={selectedLocation} variant="outlined" onChange={(e) => setSelectedLocation(e.target.value as any)}>
                        {locations.map(location => (
                            <MenuItem key={location.Id} value={location as any}>{location.Id}</MenuItem>
                        ))}
                    </Select> */}
        </Root>
    );
};

export default ImageUploader;
