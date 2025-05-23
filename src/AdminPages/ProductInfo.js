import React from 'react';
import { Bold, Italic, Underline, Link, Image, Quote, Code, List } from 'lucide-react';
import {
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import { Eye, Trash2, Upload } from 'lucide-react';
import ProductVarient from './ProductVarient';

export default function ProductInfoForm() {
    const images = [
        'https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300',
        'https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300',
        'https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300',
        'https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300'
      ];
  return (
    <div className="flex flex-col items-center mt-32">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md m-2">
        <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tiro track jacket"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                SKU
              </label>
              <input
                id="sku"
                type="text"
                placeholder="124617209"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="w-full">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight
              </label>
              <div className="flex">
                <input
                  id="weight"
                  type="number"
                  placeholder="0.2"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <select className="border border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring focus:ring-blue-400">
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Used to calculate shipping rates at checkout and label prices during fulfillment.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-2">
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Bold className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Italic className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Underline className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Link className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Image className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Quote className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Code className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <List className="h-4 w-4" />
            </button>
          </div>

          
        </form>
      </div>

      {/* Media Gallery */}
      {/* <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="font-bold">Media</Typography>
        <Button variant="outlined" className="flex items-center">
          Add media from URL
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {images.map((src, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                alt={`Product image ${index + 1}`}
                className="w-full h-auto object-cover aspect-square"
                height="300"
                src={src}
                width="300"
              />
              <div className="flex justify-end p-2 bg-white bg-opacity-80">
                <Button variant="text" size="small" className="p-1">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="text" size="small" className="p-1">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-gray-300">
        <CardContent className="flex flex-col items-center justify-center h-48 p-6">
          <Upload className="h-10 w-10 text-gray-500 mb-4" />
          <Typography variant="h6" className="font-medium mb-2">Drag and drop your file here</Typography>
          <Typography variant="body2" className="text-gray-500 mb-4">or</Typography>
          <Button variant="outlined">Browse files</Button>
        </CardContent>
      </Card>
      </div> */}

      {/* Product Varient */}
      <ProductVarient />
    </div>
  );
}
