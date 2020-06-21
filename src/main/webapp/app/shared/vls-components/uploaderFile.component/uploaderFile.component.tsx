import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

import './uploaderFile.component.scss';

{/* <UploaderComponent
onchanged={this.handleChange}
filesType={['image/jpeg', 'image/png', 'application/pdf']}
uploaderText={translate("reviewYourCart.dragAndDropSignature")}
maximumFileSize={5000000}
filesNumber={5}
/> */}


const UploaderComponent = props => {
    
    const onDropHandler = files => {
        const file = files[0]
        const reader = new FileReader();
        reader.onload = event => {
            file.base64 = event.target.result;
        };
        reader.readAsDataURL(file);
         return file;
    }
    
    return (
        <DropzoneArea
            onChange={props.onchanged}// props.onchanged
            acceptedFiles={props.filesType} // ['image/jpeg', 'image/png', 'image/bmp', 'application/*']
            // showPreviews={true}
            // showFileNamesInPreview={true}
            maxFileSize={props.maximumFileSize}
            dropzoneText={props.uploaderText}
            dropzoneClass={props.class}
            useChipsForPreview={false}
            showAlerts={false}
            filesLimit={props.filesNumber}
            onDrop={onDropHandler}
            // initialFiles={[props.init]}
        />
    );
}

export default UploaderComponent;