import React, { useEffect, useState } from 'react'

import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';


const ManageReviews = () => {
  const [allReviewforms, setAllReviewforms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-reviewforms").then(res => res.json()).then(data => setAllReviewforms(data));
  },[])

  //delete 1 review
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/reviewform/${id}`, {
      method: "DELETE",
    }).then(res => res.json()).then(data =>  {
      alert("Customer Review Delete Successfully!")
      //setAllReviews(data);
    })
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage User Reviews</h2>  

      {/* Table */}
      <Table className='lg:w-[1180px] '>
        <Table.Head>
          <Table.HeadCell>Number</Table.HeadCell>
          <Table.HeadCell>Customer Name</Table.HeadCell>
          <Table.HeadCell>Review Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Service Rating</Table.HeadCell>
          <Table.HeadCell><span>Edit Or Delete</span></Table.HeadCell>
        </Table.Head>
        {
          allReviewforms.map((reviewform, index) => <Table.Body className="divide-y" key={reviewform._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{reviewform.full_name}</Table.Cell>
            <Table.Cell>{reviewform.review_title}</Table.Cell>
            <Table.Cell>{reviewform.category}</Table.Cell>
            <Table.Cell>{reviewform.service_rate}</Table.Cell>
            <Table.Cell>
              
            <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5" to={`/admin/dashboard/edit-reviewforms/${reviewform._id}`}>
                Edit
              </Link>

              <button onClick={() => handleDelete(reviewform._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
          </Table.Body>)
        }
      </Table>

    </div>
  )
}

export default ManageReviews