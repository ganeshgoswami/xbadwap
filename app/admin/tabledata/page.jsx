"use client";
import React, { useContext, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminContext } from "@/app/providers/AdminContext";

export default function AdminTable() {
  const { alldata, deletedata, edit, getalldata, totalPages, currentPage } = useContext(AdminContext);

  const [deleteVideoName, setDeleteVideoName] = useState(null);
  const [updatedData, setUpdatedData] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [titel, setTitel] = useState("");
  const [category, setCategory] = useState("");
  const [videourl, setVideourl] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [models, setModels] = useState("");
  const [alt, setAlt] = useState("");
  const [embedVideo, setEmbedVideo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pStar = useMemo(
    () => [
      "Tyler Cruise","Jameliz","Evelyn Claire","Nick Yardy","Paisley Porter","Yegane Mohr","Lulu Chu","Riley Reid","Lana Rhoades","Mia Malkova","Eva Elfie","Johnny Sins","Violet Myers","Brandi Love","Gabbie Carter","Autumn Falls","Alexis Texas","Gianna Dior","Aaliyah Hadid","Skylar Vox","Lexi Lore","Alina Lopez","Bus","Emily Willis","Dillion Harper","Abella Danger","Dani Daniels","Angelica Heaven","Alecia Fox","Hailey Rose","Kathryn Mae","Mia Khalifa","Nicole Aniston","Juniper Ren","Valentina Nappi","Amarna Miller","Karla Kush","Samantha Sin","Freya Dee","Janice Griffith","Adriana Chechik","Sonya Blaze","Alyx Star","Angela White","Cory Chase","Elsa Jean","Desi Bhabhi","Sister","Sexy Girl","Other","18+ Sex"
    ],
    []
  );

  const categoryData = useMemo(() => {
    const out = [];
    (alldata || []).forEach((n) => {
      if (out.indexOf(n.Category) === -1) out.push(n.Category);
    });
    return out;
  }, [alldata]);

  const searchIdForDelete = (id) => {
    const found = alldata.find((n) => n._id === id);
    setDeleteVideoName(found);
  };

  const deleteVideo = async (id) => {
    await deletedata(id);
  };

  const handelUpdateVideo = async (id, e) => {
    e.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = { imgUrl, titel, category, videourl, embedVideo, description, duration, models, alt };
    try {
      await edit(id, formData);
      setImgUrl("");
      setTitel("");
      setCategory("");
      setVideourl("");
      setEmbedVideo("");
      setDescription("");
      setDuration("");
      setModels("");
      setAlt("");
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const searchData = (id) => {
    const u = alldata.find((n) => n._id === id);
    if (!u) return;
    setUpdatedData(u);
    setImgUrl(u.ImgUrl || "");
    setTitel(u.Titel || "");
    setCategory(u.Category || "");
    setVideourl(u.Videourl || "");
    setDescription(u.Description || "");
    setDuration(u.Duration || "");
    setModels(u.Models || "");
    setAlt(u.Alt || "");
    setEmbedVideo(u.EmbedVideo || "");
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= (totalPages || 1)) {
      await getalldata(newPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="container mt-4">
      {alldata && alldata.length > 0 ? (
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.Category}</td>
                    <td>
                      <img loading="lazy" src={item.ImgUrl} alt={item.Titel} style={{ width: "100px", height: "auto" }} />
                    </td>
                    <td>
                      <div className="d-flex flex-wrap">
                        <button
                          type="button"
                          className="btn btn-success m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editData"
                          onClick={() => searchData(item._id)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => searchIdForDelete(item._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="pagination-controls mt-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#87341a" }}
              onClick={() => handlePageChange((currentPage || 1) - 1)}
              disabled={(currentPage || 1) === 1}
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#87341a" }}
              onClick={() => handlePageChange((currentPage || 1) + 1)}
              disabled={(currentPage || 1) === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No data available.</p>
      )}

      {/* Delete Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4>Are You Sure , Delete This Video</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deleteVideo(deleteVideoName?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editData" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Video</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label>Model Name</label>
                  <select name="models" value={models} className="form-control" onChange={(e) => setModels(e.target.value)}>
                    <option value="" disabled>Choose Category</option>
                    {pStar.map((vl) => (
                      <option key={vl} value={vl}>{vl}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Image Url</label>
                  <input type="text" className="form-control" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Video Url</label>
                  <input type="text" className="form-control" value={videourl} onChange={(e) => setVideourl(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label>Alt For Images</label>
                  <input type="text" name="alt" className="form-control" placeholder="Enter Alt For Images" value={alt} onChange={(e) => setAlt(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Embed Video</label>
                  <input type="text" className="form-control" value={embedVideo} placeholder="Enter Embed Video URL (iframe src)" onChange={(e) => setEmbedVideo(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Titel</label>
                  <input type="text" className="form-control" value={titel} onChange={(e) => setTitel(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <select name="category" value={category} className="form-control" onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Choose Category</option>
                    {categoryData.map((vl) => (
                      <option key={vl} value={vl}>{vl}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Duration</label>
                  <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Description</label>
                  <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => handelUpdateVideo(updatedData?._id, e)}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
