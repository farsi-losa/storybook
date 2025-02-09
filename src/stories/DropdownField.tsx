import React, { useEffect, useRef, useState } from 'react';

import './DropdownField.css';

const remove_button_outline = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline ml-1 text-gray-400 hover:text-red-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

const remove_button_fill = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-400 ">
  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
</svg>


const arrow_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 float-right mt-2 mr-2 text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

const search_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

export interface DropdownSearchProps {
  options: string[];
  outline: boolean;
  multiple: boolean;
  onReturnValue: (value: string[] | string) => void;
}

/** Primary UI component for user interaction */
export const DropdownSearch: React.FC<DropdownSearchProps> = ({ options, outline, multiple, onReturnValue }) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [selectedOpt, setselectedOpt] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [selectedSingleOpt, setSelectedSingleOpt] = useState<string>('');
  const [option_list] = useState<string[]>(options)

  const onClickDropdown = () => {
    setSearchActive(true);
  }

  const onClickOption = (val: string) => {

    // checking option is selected
    if (!selectedOpt.includes(val)) {
      setselectedOpt([val, ...selectedOpt]);
    }
    onReturnValue([val, ...selectedOpt]);
  }

  const onClickSingleOption = (val: string) => {
    setSelectedSingleOpt(val);
    onReturnValue(val)
  }

  const ref = useOutsideClick(() => {
    setSearchActive(false);
    setSearchKey('');
  });

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  }

  const clearSearch = () => {
    setSearchKey('');
  }

  const removeSelectedOption = (value: string) => {

    // remove the selected option from selected option list
    const newArray = selectedOpt.filter(item => item !== value);
    setselectedOpt(newArray);
    onReturnValue(newArray);
  }

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    // Create a regular expression to match the search term (case-insensitive)
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    // Split the text by the search term and wrap matches in a span with a highlight class
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-teal-100">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative items-center justify-items-center h-[300px] p-[30px]" ref={ref}>
      <div className={`${outline ? "outline outline-[1] outline-gray-300" : 'bg-gray-100'} rounded-md w-full h-auto cursor-pointer pt-2 px-1 min-h-[45px]`} onClick={onClickDropdown}>
        {multiple
          ? selectedOpt.map(item => <span key={item} className={`rounded-full px-3 py-1 text-sm mx-1 mb-2 inline-block  ${outline ? 'bg-gray-100' : 'bg-white outline outline-[1] outline-gray-300 '}`}>{item} <span onClick={() => removeSelectedOption(item)}>{remove_button_outline}</span></span>)
          : selectedSingleOpt === "" || <span className={`rounded-full px-3 py-1 text-sm mx-1 mb-2 inline-block  ${outline ? 'bg-gray-100' : 'bg-white outline outline-[1] outline-gray-300 '}`}>{selectedSingleOpt} </span>}
        {arrow_icon}
      </div>
      <div className={`left-[30px] right-[30px] rounded-md outline outline-[1] outline-gray-300 absolute bg-white ${searchActive ? '' : "hidden"}`}>
        <div className="border-b flex p-2">
          <div>{search_icon}</div> <input value={searchKey} onChange={onSearchInputChange} className="flex-1 focus:outline-0 px-2" />
          {searchKey.length === 0 || <div className="cursor-pointer" onClick={clearSearch}>{remove_button_fill}</div>}
        </div>
        <div className="text-sm">
          {option_list.map(item =>
            <div key={item} className="py-1 px-2 cursor-pointer hover:bg-teal-50 " onClick={() => multiple ? onClickOption(item) : onClickSingleOption(item)}>{highlightMatch(item, searchKey)}</div>
          )}
        </div>
      </div>
    </div>
  );
};


export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);


    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return ref;
};


