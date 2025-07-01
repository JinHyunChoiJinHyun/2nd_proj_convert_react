import React, {useState, useRef, useEffect} from 'react'
import "./Dropdown.css"
import { isObject } from 'chart.js/helpers';


const Dropdown = ({options, coinSymbol, className = "", onChange, setSelectedPredictPeriod, setSelectedCoinSymbol, optionKey, optionValue, isObject}) => {
    const [isOpen, setIsOpen] = useState(false);    
    const [selected, setSelected] = useState(null);    
    const dropdownRef = useRef(null); // dropdown 영역만 기억 -> 컨트롤은 state를 통해 진행 	// 특정 DOM 요소(영역)를 기억해두는 용도 직접 컨트롤 기능은 없고, 그냥 ‘여기가 어디다!’ 라고 표시하는 역할
    //useRef는 ‘영역 표시기’
    //useState는 ‘기능 스위치’ 같은 개념    

    useEffect(() => {
        const handleClickOutside = (e) => { 
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false); // dropdown 영역 외의 요소 클릭 시 dropdown 닫기
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside) // 오류 방지
    }, [])

    const handleSelect = (option) => {
        setSelected(option);        
        setIsOpen(!isOpen);
        // onChange(option);
        setSelectedPredictPeriod?.(option) // ?.(옵셔널 체이닝) => 해당 함수가 존재하면 값을 반환하고 없으면 undefined 반환        
        
        console.log(option)
    }      
    const handleSelectSymbol = (option) => {
        setSelectedCoinSymbol?.(option)
    }  
    
  return (
    <div ref={dropdownRef} className={`dropdownContainer ${className}`}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className='dropdownBtn'
            type='button'
        >
            {selected || "옵션을 선택하세요"}
            <span className='downArrow'>▼</span>
        </button>       
        
        {isOpen &&(
            <ul className='dropdownMenu'>
                {options.map((option,idx) => (
                    
                    <li key={idx}>
                        <button
                            onClick={() => {handleSelect(isObject ? option[optionKey] : option), handleSelectSymbol(isObject ? option[optionValue] : option)}}
                        >
                            {isObject ? option[optionKey] : option}                            
                        </button>
                    </li>                  
                      
                ))}
            </ul>
        )}        
              
    </div>
  )
}

export default Dropdown
