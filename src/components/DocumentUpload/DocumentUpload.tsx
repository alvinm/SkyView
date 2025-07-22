import React, { useState } from "react";



const ImageUpload = (props:any) => {
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const [name, setName]           = useState<any>("")
    const [mimeType, setMimeType]   = useState<any>("")

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
                setImageBlob(blob);
                setName(file.name)
                setMimeType(file.type)
            };
        }
    };

    const handleUpload = async () => {
        if (!imageBlob) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageBlob,name);
        formData.append("project_id", props.params.project_id);
        formData.append("process_id", props.params.process_id);
        formData.append("task_id", props.params.task_id);
        formData.append("mime_type", mimeType)
        formData.append("user_id", props.params.user_id)

        await fetch(props.state.secondary_host+"upload", {
            method: "POST",
            body: formData,
        });

        console.log("Image uploaded successfully");
        props.result(1)
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <br/><br/>
            <div onClick={handleUpload} className="ion-padding text-container">Upload Document</div>
        </div>
    );
};

export default ImageUpload;
