// src/components/Card.tsx
interface CardProps {
  title: string;
  author: string;
  isPaid: boolean;
}

const Card: React.FC<CardProps> = ({ title, author, isPaid }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105`}>
      <div className="absolute inset-0 bg-gray-300 transition-opacity hover:opacity-50"></div>
      <div className="relative z-10 p-4 bg-white rounded-b-lg">
        <h3 className="mt-2 text-lg font-bold">{title}</h3>
        <span className="block text-sm text-gray-500">
          by <a href="#" className="text-blue-500">{author}</a>
        </span>
        <div className="absolute bottom-0 right-0 p-4 text-gray-500">
        </div>
        
          <span className={`${isPaid ? 'text-green-500' : 'text-red-500'}`}>
            {isPaid ? 'Paid' : 'Unpaid'}
          </span>
      </div>
    </div>
  );
};

export default Card;
