import React, {useState, useRef, useEffect} from 'react'
import "./Dropdown.css"


const Dropdown = ({options,className = ""}) => {
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
    }    

  return (
    <div ref={dropdownRef} className={`dropdownContainer ${className}`}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className='dropdownBtn'
        >
            {selected || "옵션을 선택하세요"}
            <span className='downArrow'>▼</span>
        </button>       
        
        {isOpen &&(
            <ul className='dropdownMenu'>
                {options.map((option,idx) => (
                    <li key={idx}>
                        <button
                            onClick={() => {handleSelect(option)}}
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        )}        
              
    </div>
  )
}

export default Dropdown
