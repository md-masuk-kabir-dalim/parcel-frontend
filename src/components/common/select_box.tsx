import React, { useState, useEffect, useRef, ChangeEvent } from 'react'

interface Option {
  label?: string
  value: string
}

interface SelectBoxProps {
  options: Option[]
  methods: any
  label?: string
  name?: string
  placeholder?: string
  defaultValue?: any
  icon?: any // Add icon prop
  inputValue?: any
  setInputValue?: any
  setIsOpen: any
  isOpen: any
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  methods,
  label,
  name,
  placeholder,
  defaultValue,
  icon, // Destructure icon prop
  inputValue,
  setInputValue,
  setIsOpen,
  isOpen
}) => {
  const [value, setValue]: any = useState(defaultValue || '')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setIsOpenDropdown(false)
      }
    }

    const handleScroll = () => {
      setIsOpen(false)
      setIsOpenDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setIsOpen])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    const filtered = options.filter(option =>
      option.label?.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
    setSelectedIndex(null)
  }

  const handleSelectOption = (option: Option) => {
    setInputValue(option.label || '')
    setValue(option.value || '')
    setIsOpen(false)
    setIsOpenDropdown(false)
    setSelectedIndex(null)
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
    setIsOpenDropdown(!isOpenDropdown)
  }

  //========= value set ======//
  useEffect(() => {
    methods.setValue(name, value)
  }, [methods, value, name])

  return (
    <div className="relative w-full">
      <label htmlFor={name}>{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue || ''}
          onChange={handleInputChange}
          onClick={handleOpen}
          // required
          ref={inputRef}
          className="border border-gray-300 p-2 rounded-md w-full focus:outline-none mt-2"
          placeholder={placeholder}
        />
        {icon && (
          <span className="absolute right-2 top-[60%] transform -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
      {isOpenDropdown && filteredOptions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute -left-8 right-0 z-40 w-full h-52 overflow-y-auto p-2 bg-white border-[1px] border-_primary mt-1 rounded-md shadow-2xl"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={`group flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-full ${
                selectedIndex === index ? 'bg-gray-200' : ''
              }`}
            >
              <span
                className="w-full hover:text-primary"
                onClick={() => handleSelectOption(option)}
              >
                {option.label && option.label.length > 30
                  ? `${option.label.slice(0, 30)}...`
                  : option.label || 'Unknown'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectBox
