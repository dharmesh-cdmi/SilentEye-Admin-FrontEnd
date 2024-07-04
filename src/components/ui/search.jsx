import { cn } from '@/lib/utils';
import { MoveRight, Search } from 'lucide-react';
import { useState } from 'react';

const CommonSearch = ({ onSearch, className}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="">
      <div className={cn(`w-full max-w-sm mx-auto flex justify-center items-center h-[40px] border border-gray-300  pl-3 rounded-lg`,className)}>
      <Search className=' w-8 h-8'/>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-800 text-[16px] mr-3 py-1 px-3 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          aria-label="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-[#DDDDDD] hover:bg-[#b5b5b5] text-sm  h-full px-3 rounded-r-lg"
        >
          <MoveRight className='w-5'/>
        </button>
      </div>
    </form>
  );
};

export default CommonSearch;
