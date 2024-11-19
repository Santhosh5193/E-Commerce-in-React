import React, { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Imageupload() {
  //   const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (files.length > 3) {
      event.target.files = "";
      return;
    }

    setLoading(true);
    const uploadedUrls = []; // Array to store uploaded image URLs

    // Create FormData for each file and upload to Cloudinary
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Exclusive-App"); // Replace with your Cloudinary preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/deevcwi6g/image/upload`, // Replace with your Cloud Name
          formData
        );

        // Get the image URL and push it to the array
        const url = response.data.secure_url;
        uploadedUrls.push(url);
        console.log("Uploaded Image URL:", url);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading one of the images.");
      }
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    setImageUrl(uploadedUrls); // Set the array of image URLs once all uploads are complete
    setLoading(false);

    console.log("First Image URL set:", uploadedUrls);
  };

  const handleFireBaseUpload = async () => {
    if (imageUrl.length === 0) {
      alert("No image URLs available. Please upload images.");
      return;
    }

    const productData = {
      productName: "NIKON Z 50 Mirrorless Camera",
      description:
        "Compact and lightweight mirrorless camera with a 20.9 MP DX-format sensor, 4K UHD video recording, and built-in Wi-Fi for stunning photos and videos. Ideal for creators on the go.",
      offerPrice: 85999.99,
      originalPrice: 90000,
      offer: "4% OFF",
      image: imageUrl,
      ratings: [1, 2, 3, 4, 5],
      stockLeft: 20,
      category: "electronics",
      type: "Explore-Products",
    };
    // const productData = {
    //   image: imageUrl,
    //   name: "HeadPhones",
    // };

    try {
      const docRef = await addDoc(collection(db, "Products"), productData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-10 text-3xl">
      <h1>Upload Image to Cloudinary</h1>
      <input
        multiple
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        max={3}
      />
      {loading ? (
        <p>Uploading...</p>
      ) : (
        imageUrl && (
          <div>
            <p>Image uploaded successfully!</p>
            <div>
              {imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                  width="100"
                />
              ))}
            </div>
          </div>
        )
      )}
      <button onClick={handleFireBaseUpload}>upload to Firebase</button>
    </div>
  );
}

export default Imageupload;
// import React, { useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";

// function ImageUpload() {
//   const db = getFirestore();

//   async function renameCollection(oldName, newName) {
//     const oldCollection = collection(db, oldName);
//     const newCollection = collection(db, newName);

//     try {
//       // Get all documents from the old collection
//       const snapshot = await getDocs(oldCollection);

//       for (const docSnapshot of snapshot.docs) {
//         // Copy each document to the new collection
//         await setDoc(doc(newCollection, docSnapshot.id), docSnapshot.data());
//         // Delete the document from the old collection
//         await deleteDoc(doc(oldCollection, docSnapshot.id));
//       }

//       console.log(`Collection renamed from "${oldName}" to "${newName}".`);
//     } catch (error) {
//       console.error("Error renaming collection:", error);
//     }
//   }

//   useEffect(() => {
//     // Call the renameCollection function when the component mounts
//     renameCollection("Flash-Products", "Products");
//   }, []); // Empty dependency array ensures it runs only once

//   return (
//     <div>
//       <h1>Renaming Firestore Collection</h1>
//       <p>Please check the console for progress.</p>
//     </div>
//   );
// }

// export default ImageUpload;
