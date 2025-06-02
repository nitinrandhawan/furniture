import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../services/FetchNodeServices.js";
import "./product.css";
import { fileLimit } from "../../services/fileLimit.js";
const EditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    images: [],
    price: 0,
    discount: 0,
    // stock: 0,
    finalPrice: 0,
    brand: "",
    description: "",
    isFeatured: "",
    material: "",
    weight: "",
    sku: "",
    dimensionsInch: "",
    dimensionsCm: "",
    subCategory: "",
    Specifications: "",
    BrandCollectionOverview: "",
    CareMaintenance: "",
    seller: "",
    Warranty: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/category/get-all-categories"
      );
      if (response?.status === 200) {
        setCategoryList(response.data.data);
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Error fetching Category data"
      );
    }
  };
  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/get-single-product/${id}`
      );
      const data = response?.data?.data;
      if (response.status === 200) {
        setFormData({
          productName: data.productName,
          images: [],
          price: data.price,
          // stock: data.stock,
          finalPrice: data.finalPrice,
          discount: data.discount,
          brand: data.brand,
          description: data.description,
          isFeatured: data.isFeatured,
          material: data.material,
          weight: data.weight,
          sku: data.sku,
          dimensionsInch: data.dimensionsInch,
          dimensionsCm: data.dimensionsCm,
          categoryId: data.category,
          Specifications: data.Specifications,
          BrandCollectionOverview: data.BrandCollectionOverview,
          CareMaintenance: data.CareMaintenance,
          seller: data.seller,
          Warranty: data.Warranty,
        });
        try {
          const res = await axiosInstance.get(
            `/api/v1/category/get-subcategories-by-category/${data?.category}`
          );
          setSubcategoryList(res?.data?.data);
          setFormData((prev) => ({
            ...prev,
            subCategory: data?.subCategory?._id,
          }));
        } catch (error) {
          console.log("fetching subcategory error", error);
          toast.error("Error fetching subcategory data");
        }
      }
    } catch (error) {
      console.log("fetched product details", error.message);
      toast.error(error?.response?.data?.message || "fetched product details");
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchProductDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    try {
      const res = await axiosInstance.get(
        `/api/v1/category/get-subcategories-by-category/${value}`
      );
      setSubcategoryList(res?.data?.data);
    } catch (error) {
      console.log("fetching subcategory error", error);
      toast.error("Error fetching subcategory data");
    }
  };
  const handleJoditChange = (newValue) => {
    setFormData((prev) => ({ ...prev, description: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.categoryId) {
      toast.error("category is required");
      return;
    }
    if (!fileLimit(formData?.coverImage)) return;
    if (formData.images && Array.isArray(formData.images)) {
      for (const image of formData.images) {
        if (!fileLimit(image)) {
          setIsLoading(false);
          return;
        }
      }
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          payload.append(key, item);
        });
      } else {
        payload.append(key, value);
      }
    });
    payload.append("category", formData.categoryId);
    try {
      const response = await axiosInstance.put(
        `/api/v1/product/update-product/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("product updated success");
        navigate("/all-products");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to update product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: [...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  useEffect(() => {
    let total = parseFloat(
      formData.price * (1 - formData.discount / 100)
    ).toFixed(2);
    setFormData((prev) => ({ ...prev, finalPrice: total }));
  }, [formData.price, formData.discount]);
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Update Product</h4>
        </div>
        <div className="links">
          <Link to="/all-products" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          {/* <div className="col-md-3">
            <label className="form-label">Product Image*</label>
            <input type="file" className="form-control" multiple onChange={handleFileChange} required />
          </div> */}

          <div className="col-md-3">
            <label className="form-label">Product Name*</label>
            <input
              type="text"
              name="productName"
              className="form-control"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">material*</label>
            <input
              type="text"
              name="material"
              className="form-control"
              value={formData.material}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">weight*</label>
            <input
              type="text"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">sku*</label>
            <input
              type="text"
              name="sku"
              className="form-control"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">dimensionsInch*</label>
            <input
              type="text"
              name="dimensionsInch"
              className="form-control"
              value={formData.dimensionsInch}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">dimensionsCm*</label>
            <input
              type="text"
              name="dimensionsCm"
              className="form-control"
              value={formData.dimensionsCm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Brand*</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              list="doorOptions"
              value={formData.brand}
              onChange={handleChange}
              required
            />
            <datalist id="doorOptions">
              <option value="Single Door" />
              <option value="Sliding brand" />
              <option value="Mirror Door" />
              <option value="Sliding Mirror Door" />
              <option value="Double Door" />
              <option value="Triple Door" />
              <option value="Four Door" />
            </datalist>
          </div>

          <div className="col-md-3">
            <label className="form-label">Select Category</label>
            <select
              name="categoryId"
              id=""
              required
              onChange={handleCategoryChange}
              value={formData.categoryId}
            >
              <option value="">Select Category</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Select Sub Category</label>
            <select
              name="subCategory"
              id=""
              required
              onChange={handleChange}
              value={formData.subCategory}
            >
              <option value="">Select Category</option>
              {subcategoryList.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.subCategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Images</label>
            <input
              type="file"
              multiple
              name="images"
              className="form-control"
              onChange={handleFileChange}
              maxLength={4}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Product Description*</label>
            <JoditEditor
              value={formData.description}
              onChange={handleJoditChange}
            />
          </div>

          <div className="row">
            <div className="col-md-2">
              <label className="form-label">Price*</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Discount %*</label>
              <input
                type="number"
                name="discount"
                className="form-control"
                value={formData.discount}
                onChange={handleChange}
                min={0}
                max={100}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Final Price*</label>
              <input
                type="number"
                name="finalPrice"
                className="form-control"
                value={formData.finalPrice}
                readOnly
              />
            </div>

            {/* <div className="col-md-2">
              <label className="form-label">Stock</label>
              <input
                type="text"
                name="stock"
                className="form-control"
                value={formData.stock}
                onChange={handleChange}
              />
            </div> */}
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-md-3">
              <label className="form-label">Specifications*</label>
              <input
                type="text"
                name="Specifications"
                className="form-control"
                value={formData.Specifications}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">BrandCollectionOverview*</label>
              <input
                type="text"
                name="BrandCollectionOverview"
                className="form-control"
                value={formData.BrandCollectionOverview}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">CareMaintenance*</label>
              <input
                type="text"
                name="CareMaintenance"
                className="form-control"
                value={formData.CareMaintenance}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">seller*</label>
              <input
                type="text"
                name="seller"
                className="form-control"
                value={formData.seller}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Warranty*</label>
              <input
                type="text"
                name="Warranty"
                className="form-control"
                value={formData.Warranty}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12" style={{ marginTop: "20px" }}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="status"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="status">
                Featured Product
              </label>
            </div>
          </div>
          </div>
          <div className="col-md-12 mt-4 text-center">
            <button type="submit" className="btn " disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
