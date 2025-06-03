import React, {useState, useRef, useEffect} from 'react'

const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null); // dropdown 영역만 기억 -> 컨트롤은 state를 통해 진행 	// 특정 DOM 요소(영역)를 기억해두는 용도 직접 컨트롤 기능은 없고, 그냥 ‘여기가 어디다!’ 라고 표시하는 역할
    //useRef는 ‘영역 표시기’
    //useState는 ‘기능 스위치’ 같은 개념
    

    const options = ["사과", "바나나", "체리"]

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
        setIsOpen(false);
    }
  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className='btn'
        >
            {selected || "옵션을 선택하세요"}
            <span className='float-right'>▼</span>
        </button>
        {isOpen &&(
            <ul>
                {options.map((option) => (
                    <li key={{option}}>
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
