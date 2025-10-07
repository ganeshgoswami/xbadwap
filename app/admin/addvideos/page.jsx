"use client";
import React, { useContext, useState } from "react";
import { AdminContext } from "../../providers/AdminContext";

export default function AddCollection() {
  const [imgUrl, setImgUrl] = useState("");
  const [titel, setTitel] = useState("");
  const [alt, setAlt] = useState("");
  const [models, setModels] = useState("");
  const [category, setCategory] = useState("");
  const [videourl, setVideourl] = useState("");
  const [embedVideo, setEmbedVideo] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const { alldata, addVdata } = useContext(AdminContext);
  const [items, setItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdow = [
    "Nude Porn",
    "Doggystyle",
    "Girlfriend",
    "Rough Hard Sex",
    "Uncut Desi",
    "Xmilfnut",
    "Big Boobs",
    "Pussy",
    "Love Sex",
    "Bisexual",
    "69",
    "Sister",
    "College",
    "Daddy",
    "Milfnut",
    "Hard Fuck",
    "Cowgirl",
    "Gang Fuck",
    "Mom",
    "Indian",
    "Teen",
    "Big Buddy",
    "Russian",
    "Japanese",
    "Mia Khalifa",
    "Lesbian Sex",
    "Threesome",
    "Crazy Porn",
    "Hd Porn",
    "Desi Sex",
    "Hot Mom",
    "Anal",
    "Asian",
    "Big Ass",
    "Amateur",
    "Popular Video",
    "Letest Video",
  ];

  const pStar = [
    "Sasha Grey","Lena Paul","Lisa Ann","Aubree Valentine","Tyler Cruise","Jameliz","Evelyn Claire","Nick Yardy","Paisley Porter","Yegane Mohr","Lulu Chu","Riley Reid","Lana Rhoades","Mia Malkova","Eva Elfie","Johnny Sins","Violet Myers","Brandi Love","Gabbie Carter","Autumn Falls","Alexis Texas","Gianna Dior","Aaliyah Hadid","Skylar Vox","Lexi Lore","Alina Lopez","Bus","Emily Willis","Dillion Harper","Abella Danger","Dani Daniels","Angelica Heaven","Alecia Fox","Hailey Rose","Kathryn Mae","Mia Khalifa","Nicole Aniston","Juniper Ren","Valentina Nappi","Amarna Miller","Karla Kush","Samantha Sin","Freya Dee","Janice Griffith","Adriana Chechik","Sonya Blaze","Alyx Star","Angela White","Cory Chase","Elsa Jean","Desi Bhabhi","Sister","Sexy Girl","Other","18+ Sex"
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const videoData = { imgUrl, titel, category, videourl, embedVideo, description, duration, models, alt };

    try {
      await addVdata(videoData, setItems);
      // reset form
      setImgUrl("");
      setTitel("");
      setAlt("");
      setModels("");
      setCategory("");
      setVideourl("");
      setEmbedVideo("");
      setDescription("");
      setDuration("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 shadow p-3 mb-5 bg-body-tertiary text-center rounded">
          {alldata.length}
          <h2 className="text-center">Add Collection</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="w-100 text-center">Models Names</label>
              <select name="models" value={models} className="form-control" onChange={(e) => setModels(e.target.value)}>
                <option value="">Choose Models</option>
                {pStar.map((vl) => (
                  <option key={vl} value={vl}>{vl}</option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Img Url</label>
              <input type="text" name="imgUrl" className="form-control" placeholder="Enter Image Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Video Url</label>
              <input type="text" name="videourl" className="form-control" placeholder="Enter Video Url" value={videourl} onChange={(e) => setVideourl(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Embed Video</label>
              <input type="text" name="embedVideo" className="form-control" placeholder="Enter Embed Video URL (iframe src)" value={embedVideo} onChange={(e) => setEmbedVideo(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Alt For Images</label>
              <input type="text" name="alt" className="form-control" placeholder="Enter Alt For Images" value={alt} onChange={(e) => setAlt(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Titel</label>
              <input type="text" name="titel" className="form-control" placeholder="Enter Titel" value={titel} onChange={(e) => setTitel(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Category</label>
              <select name="category" value={category} className="form-control" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {dropdow.map((vl) => (
                  <option key={vl} value={vl}>{vl}</option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Description</label>
              <input type="text" name="description" className="form-control" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="form-group mb-3">
              <label className="w-100 text-center">Duration</label>
              <input type="text" name="duration" className="form-control" placeholder="Enter Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary btn-block d-block mx-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                "Add New Collection"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
