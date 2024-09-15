import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  id: string;
  author: string;
  isPaid: boolean;
}

const Card: React.FC<CardProps> = ({ title, id, author, isPaid }) => {
  return (
    <Link
      to={`/DetailMemberList/${id}`}
      className="block text-current no-underline"
    >
      <div className={`relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105`}>
        <div className="absolute inset-0 bg-gray-300 transition-opacity hover:opacity-50"></div>
        <div className="relative z-10 p-4 bg-white rounded-b-lg">
          <h3 className="mt-2 text-lg font-bold">{title}</h3>
          <span className="block text-sm text-gray-500">
            by <span className="text-blue-500">{author}</span>
          </span>
          <div className="absolute bottom-0 right-0 p-4 text-gray-500">
          </div>
          <span className={`${isPaid ? 'text-green-500' : 'text-red-500'}`}>
            {isPaid ? 'Paid' : 'Unpaid'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;