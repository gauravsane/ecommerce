import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../Redux-toolkit/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state?.getData?.data);
  // console.log(data);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };

  const [name, setPname] = useState("");
  const [category, setCategory] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [new_price, setNewPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const [chdata, setChdata] = useState("");

  const onImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreviewImg(URL.createObjectURL(selectedFile));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDelete = async (edata) => {
    console.log(edata._id);
    try {
      const data = await axios.delete(
        `http://localhost:3200/delete/${edata._id}`
      );
      alert("Data Deleted Successfully");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (edata) => {
    // console.log(edata._id);
    setChdata(edata._id);
    setPname(edata.name);
    setCategory(edata.category);
    setOldPrice(edata.old_price);
    setNewPrice(edata.new_price);
    setImage(edata.image);
    // console.log(edata.image);
  };

  const handleUpdate = async () => {
    // console.log(chdata);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("old_price", old_price);
      formData.append("new_price", new_price);
      formData.append("image", image ? image : ""); // Append the image file to FormData
      await axios.put(`http://localhost:3200/update/${chdata}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(getData());
      alert("Product Updated Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  // const handleInsert = async () => {
  //   try {
  //     const { result } = await axios.post("http://localhost:3200/insert", {
  //       name,
  //       category,
  //       image,
  //       old_price,
  //       new_price,
  //     });
  //     // alert(result && result.message);
  //     alert("Product Inserted Successfully!");
  //     console.log(JSON.stringify(result));
  //   } catch (error) {
  //     alert(error.response.data.message || error.message);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getData());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [dispatch, loading]);

  const handleInsert = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("old_price", old_price);
      formData.append("new_price", new_price);
      formData.append("image", image); // Append the image file to FormData
      await axios.post("http://localhost:3200/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      alert("Product Inserted Successfully!");
      dispatch(getData());

      // Reset form data
      setPname("");
      setCategory("");
      setOldPrice("");
      setNewPrice("");
      setImage(null);
      setPreviewImg("");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <ClipLoader
              color={"gray"}
              loading={loading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-primary m-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@getbootstrap"
            >
              Add ++
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Insert Data
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Product Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          onChange={(e) => setPname(e.target.value)}
                        />
                      </div>
                      {/* <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div> */}
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Category
                        </label>
                        <select
                          className="form-control"
                          id="recipient-name"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">--Select a category</option>
                          <option value="men">men</option>
                          <option value="women">women</option>
                          <option value="kid">kid</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Old Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="recipient-name"
                          onChange={(e) => setOldPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          New Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="recipient-name"
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </div>
                      <br />
                      <div className="mb-3">
                        <input
                          type="file"
                          onChange={onImageChange}
                          className="filetype"
                        />
                        {previewImg && (
                          <img
                            width="50px"
                            height="50px"
                            alt="preview product"
                            src={previewImg}
                          />
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      onClick={handleInsert}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Sr No
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Name
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Image
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Category
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Old Price
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    New Price
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((e, i, datae) => {
                  const serialNumber = itemOffset + i + 1;
                  return (
                    <tr key={e._id}>
                      <td style={{ textAlign: "center" }}>{serialNumber}</td>
                      <td style={{ textAlign: "center" }}>{e.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          width="70px"
                          height="70px"
                          src={e.image ? require(`../Images/${e.image}`) : ""}
                          alt={e.name}
                          // src={image ? URL.createObjectURL(image) : ""}
                          // src={URL.createObjectURL(e)}
                        />

                        {/* <img src={`http://localhost:3200/${e.image}`} alt={e.name} /> */}
                      </td>
                      <td style={{ textAlign: "center" }}>{e.category}</td>
                      <td style={{ textAlign: "center" }}>{e.old_price}₹</td>
                      <td style={{ textAlign: "center" }}>{e.new_price}₹</td>
                      <td style={{ textAlign: "center", color: "green" }}>
                        <BiSolidPencil
                          data-bs-toggle="modal"
                          data-bs-target="#updatemodal"
                          data-bs-whatever="@getbootstrap"
                          onClick={() => handleEdit(e)}
                        />
                      </td>
                      <td style={{ textAlign: "center", color: "red" }}>
                        <MdDelete onClick={() => handleDelete(e)} />
                      </td>
                      {/* Update modal start*/}
                      <td>
                        <div
                          className="modal fade"
                          id="updatemodal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Update Data
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="mb-3">
                                    <label
                                      for="recipient-name"
                                      className="col-form-label"
                                    >
                                      Product Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="recipient-name"
                                      value={name}
                                      onChange={(e) => setPname(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      Category
                                    </label>
                                    <select
                                      className="form-control"
                                      id="recipient-name"
                                      value={category}
                                      onChange={(e) =>
                                        setCategory(e.target.value)
                                      }
                                    >
                                      <option value="">
                                        --Select a category
                                      </option>
                                      <option value="men">men</option>
                                      <option value="women">women</option>
                                      <option value="kid">kid</option>
                                    </select>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      for="recipient-name"
                                      className="col-form-label"
                                    >
                                      Old Price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="recipient-name"
                                      value={old_price}
                                      onChange={(e) =>
                                        setOldPrice(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="recipient-name"
                                      className="col-form-label"
                                    >
                                      New Price
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="recipient-name"
                                      value={new_price}
                                      onChange={(e) =>
                                        setNewPrice(e.target.value)
                                      }
                                    />
                                  </div>
                                  <br />
                                  <div className="mb-3">
                                    <input
                                      type="file"
                                      onChange={handleImageChange}
                                      className="filetype"
                                    />
                                    {preview && (
                                      <img
                                        width="50px"
                                        height="50px"
                                        alt="preview product"
                                        src={preview}
                                      />
                                    )}
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  onClick={() => handleUpdate(e)}
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Update Modal end here */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <>
                  <IoMdArrowDroprightCircle
                    size={"40px"}
                    className="text-primary"
                  />
                </>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              breakClassName="break-me"
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-end mt-3"
              pageLinkClassName="page-link"
              activeClassName="active"
              pageCount={pageCount}
              previousLabel={
                <>
                  <IoMdArrowDropleftCircle
                    size={"40px"}
                    className="text-primary"
                  />
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
