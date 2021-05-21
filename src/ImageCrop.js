// import axios from "axios";
// import React, { PureComponent, useState } from "react";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

// import FromData from "form-data";
// import { Dialog, Modal, Button } from "@material-ui/core";
// import makeStyles from "@material-ui/styles/makeStyles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 600,
//   },
//   submitButton: {
//     margin: 10,
//     backgroundColor: "orange",
//     "&:hover": {
//       backgroundColor: "#ff6600",
//     },
//   },
//   cancelButton: {
//     margin: 10,
//     backgroundColor: "#f2f2f2",
//     "&:hover": {
//       backgroundColor: "#d9d9d9",
//     },
//   },
// }));

// function ImageCrop(props) {
//   const { open, setOpen, aspect, apiUrl } = props;
//   let form = new FromData();
//   form.append("height", "");
//   form.append("file", "");
//   const token = localStorage.getItem("token");
//   apiUrl = apiUrl || "/updateAvatar";
//   const aspect = 1;
//   const [open, setOpen] = useState(false);
//   const [src, setSrc] = useState("");
//   const [crop, setCrop] = useState({
//     unit: "%",
//     width: 100,
//     x: 0,
//     y: 0,
//     aspect: aspect,
//   });

//   const classes = useStyles();

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       const file = e.target.files[0];
//       form.set("file", file, file.name);
//       reader.addEventListener("load", () => {
//         setSrc(reader.result);
//         setOpen(true);
//       });
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const onImageLoaded = (image) => {};

//   const onCropChange = (crop, percentCrop) => {
//     setCrop(crop);
//   };

//   const onCropComplete = (crop) => {
//     // console.log(crop);
//   };

//   const closeDialog = () => {
//     setOpen(false);
//   };

//   const onSubmit = () => {
//     form.set("height", JSON.stringify(crop));
//     axios
//       .post(apiUrl, form, {
//         headers: {
//           ...form.getHeaders,
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//           accept: "*/*",
//         },
//       })
//       .then((val) => console.log(val.data))
//       .catch((e) => console.log(e.response));
//   };

//   return (
//     <div className="ImageCrop">
//       <div>
//         <input type="file" accept="image/*" onChange={onSelectFile} />
//       </div>
//       {src && (
//         <Dialog open={open} onClose={closeDialog}>
//           <div className={classes.root}>
//             <ReactCrop
//               src={src}
//               crop={crop}
//               ruleOfThirds
//               onImageLoaded={onImageLoaded}
//               onComplete={onCropComplete}
//               onChange={onCropChange}
//             />
//             <Button className={classes.submitButton} onClick={onSubmit}>
//               Xác nhận
//             </Button>
//             <Button className={classes.cancelButton} onClick={closeDialog}>
//               Hủy
//             </Button>
//           </div>
//         </Dialog>
//       )}
//     </div>
//   );
// }
// // class ImageCrop extends PureComponent {
// //   state = {
// //     open: false,
// //     src: null,
// //     crop: {
// //       unit: "%",
// //       width: 100,
// //       aspect: 1,
// //     },
// //   };

// //   onSelectFile = (e) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       const reader = new FileReader();
// //       const file = e.target.files[0];
// //       form.set("file", file, file.name);
// //       reader.addEventListener("load", () => {
// //         this.setState({ src: reader.result });
// //         this.setState({ open: true });
// //       });
// //       reader.readAsDataURL(e.target.files[0]);
// //     }
// //   };

// //   // If you setState the crop in here you should return false.
// //   onImageLoaded = (image) => {
// //     this.imageRef = image;
// //   };

// //   onCropChange = (crop, percentCrop) => {
// //     this.setState({ crop });
// //   };
// //   onCropComplete = (crop) => {
// //     // console.log(crop);
// //   };

// //   closeDialog = () => {
// //     this.setState({ open: false });
// //   };

// //   onSubmit = () => {
// //     form.set("height", JSON.stringify(this.state.crop));
// //     axios
// //       .post("/updateAvatar", form, {
// //         headers: {
// //           ...form.getHeaders,
// //           "Content-Type": "multipart/form-data",
// //           Authorization: `Bearer ${token}`,
// //           accept: "*/*",
// //         },
// //       })
// //       .then((val) => console.log(val.data))
// //       .catch((e) => console.log(e.response));
// //   };

// //   render() {
// //     const { crop, src } = this.state;

// //     return (
// //       <div className="ImageCrop">
// //         <div>
// //           <input type="file" accept="image/*" onChange={this.onSelectFile} />
// //         </div>
// //         {src && (
// //           <Dialog open={this.state.open} onClose={this.closeDialog}>
// //             <div>
// //               <ReactCrop
// //                 src={src}
// //                 crop={crop}
// //                 ruleOfThirds
// //                 onImageLoaded={this.onImageLoaded}
// //                 onComplete={this.onCropComplete}
// //                 onChange={this.onCropChange}
// //               />
// //               <Button onClick={this.onSubmit}>Xác nhận</Button>
// //               <Button onClick={this.closeDialog}>Hủy</Button>
// //             </div>
// //           </Dialog>
// //         )}
// //       </div>
// //     );
// //   }
// // }

// export default ImageCrop;
