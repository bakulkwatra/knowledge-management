
// import React from "react";
// import TextSection from "../sections/TextSection";
// import ImageSection from "../sections/ImageSection";
// import FileSection from "../sections/FileSection";
// import LinkSection from "../sections/LinkSection";
// import CodeSection from "../sections/CodeSection";
// import VideoSection from "../sections/VideoSection";

// /**
//  * value/onChange signature varies by editor type:
//  * - text, link: HTML string
//  * - image: HTML string (image nodes) OR a URL array if you prefer (see ImageSection note)
//  * - code: HTML with code block (or plain code string if you prefer; current is HTML)
//  * - video: HTML (YouTube embeds)
//  * - file: array of { name, url, size? }
//  *
//  * Optional upload callbacks:
//  * - onUploadImage: (file) => Promise<string>  // should return image URL
//  * - onUploadFile:  (file) => Promise<{name,url,size?}>
//  */
// export default function EditorSection({
//   type,
//   value,
//   onChange,
//   onUploadImage,
//   onUploadFile,
//   placeholder,
// }) {
//   switch (type) {
//     case "text":
//       return <TextSection value={value} onChange={onChange} placeholder={placeholder} />;
//     case "image":
//       return (
//         <ImageSection
//           value={value}
//           onChange={onChange}
//           onUploadImage={onUploadImage}
//           placeholder={placeholder}
//         />
//       );
//     case "file":
//       return (
//         <FileSection
//           value={value}
//           onChange={onChange}
//           onUploadFile={onUploadFile}
//         />
//       );
//     case "link":
//       return <LinkSection value={value} onChange={onChange} placeholder={placeholder} />;
//     case "code":
//       return <CodeSection value={value} onChange={onChange} placeholder={placeholder} />;
//     case "video":
//       return <VideoSection value={value} onChange={onChange} placeholder={placeholder} />;
//     default:
//       return null;
//   }
// }

import React from "react";
import TextSection from "../sections/TextSection";
import ImageSection from "../sections/ImageSection";
import FileSection from "../sections/FileSection";
import LinkSection from "../sections/LinkSection";
import CodeSection from "../sections/CodeSection";
import VideoSection from "../sections/VideoSection";

export default function EditorSection({
  type,
  value,
  onChange,
  resourceType,
  sectionId,
  placeholder,
}) {
  switch (type) {
    case "text":
      return <TextSection value={value} onChange={onChange} placeholder={placeholder} />;
    case "image":
      return (
        <ImageSection
          value={value}
          onChange={onChange}
          resourceType={resourceType}
          sectionId={sectionId}
        />
      );
    case "file":
      return (
        <FileSection
          value={value}
          onChange={onChange}
          resourceType={resourceType}
          sectionId={sectionId}
        />
      );
    case "link":
      return <LinkSection value={value} onChange={onChange} placeholder={placeholder} />;
    case "code":
      return <CodeSection value={value} onChange={onChange} placeholder={placeholder} />;
    case "video":
      return <VideoSection value={value} onChange={onChange} placeholder={placeholder} />;
    default:
      return null;
  }
}
