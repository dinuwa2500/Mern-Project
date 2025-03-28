import React, { useState } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { Link } from 'react-router-dom';

const UploadReview = () => {
  const reviewformCategories = [
    "Shopping experience",
    "Selling Products experience",
    "Customer Service",
    "Inventory-Listings",
    "Payment-Methods",
    "Deliveries",
    "Secured privacy"
  ];

  const [selectedReviewformCategory, setSelectedReviewformCategory] = useState(reviewformCategories[0]);
  const [errors, setErrors] = useState({});

  const handleChangeSelectedValue = (event) => {
    setSelectedReviewformCategory(event.target.value);
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full Name is required';
    }

    if (!formData.review_title.trim()) {
      newErrors.review_title = 'Review Title is required';
    }

    if (!formData.service_rate.trim()) {
      newErrors.service_rate = 'Service Rate is required';
    } else if (isNaN(formData.service_rate) || formData.service_rate < 1 || formData.service_rate > 5) {
      newErrors.service_rate = 'Service Rate must be a number between 1 and 5';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Review Description is required';
    }

    return newErrors;
  };

  const handleReviewformSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = {
      full_name: form.full_name.value,
      category: form.categoryName.value,
      review_title: form.review_title.value,
      content: form.content.value,
      service_rate: form.service_rate.value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Send data to database
    fetch("http://localhost:5000/upload-reviewform", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Review Uploaded Successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error uploading review:", error);
      });
  };

  return (
    <div className="w-full px-4 my-12">
      <br />
      <h2 className="mb-8 text-3xl font-bold text-center" style={{ color: '#024b17' }}>Upload A Review</h2>

      <form onSubmit={handleReviewformSubmit} className="flex flex-col gap-4">
        {/* First Row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="full_name" value="Full Name" />
            </div>
            <TextInput
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Full Name"
              required
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="review_title" value="Review Title" />
            </div>
            <TextInput
              id="review_title"
              name="review_title"
              type="text"
              placeholder="Review Title"
              required
            />
            {errors.review_title && <p className="text-red-500 text-sm">{errors.review_title}</p>}
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="service_rate" value="Service Rate" />
            </div>
            <TextInput
              id="service_rate"
              name="service_rate"
              type="text"
              placeholder="Service Rate (1-5)"
              required
            />
            {errors.service_rate && <p className="text-red-500 text-sm">{errors.service_rate}</p>}
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Category Type" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedReviewformCategory}
              onChange={handleChangeSelectedValue}
            >
              {reviewformCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Third Row: Review Description */}
        <div className="w-full">
          <Label htmlFor="content" value="Review Description" />
          <Textarea
            id="content"
            name="content"
            placeholder="Write Your Review Description"
            required
            rows={10}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>

        <div className="flex justify-end items-center space-x-4 px-4 lg:px-1">
          <Link to="/reviewpage">
          <Button className="w-48 h-10" style={{ backgroundColor: '#b51d1d' }}>Cancel</Button>
          </Link>
          <Button type="submit" className="w-48 h-10" style={{ backgroundColor: '#024b17' }}>Upload Review</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadReview;