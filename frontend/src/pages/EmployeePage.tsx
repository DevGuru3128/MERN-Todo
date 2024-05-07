import React, { useState, useRef, useEffect } from "react";
import Header from '../components/Header';
import { tableHeaders } from '../config/theadConstant';
import EmployeeModal from "../components/Modal/EmployeeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@mui/material/Pagination";
import { faPlus, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, addEmployee, deleteEmployee, updateEmployee } from "../action/employee";
import { EmployeeType } from "../types/employee";
import { RootState } from "../redux/store";

const Employee = () => {
  const dispatch = useDispatch()
  const employees = useSelector((state: RootState) => state.employees.data)

  // const [showModal, setShowModal] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState({
    showModal: false,
    isEdit: false,
    id: 0
  });

  const [formData, setFormData] = useState<EmployeeType>({
    fullName: '',
    email: '',
    age: 0,
    country: '',
    profilePicture: ''
  });
  const [pageSetting, setPageSetting] = useState({currentPage: 1, startPage: 1, endPage: 1, totalPages: null});
  const fileInputRef = useRef(null);
  const pagesToShow = 5;

  const handleFileUpload = (event) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    const isImage = selectedFile.type.startsWith('image/');
    if(isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setFormData({...formData, profilePicture: base64Data})
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = async () => {
    console.log(typeof formData.country)
    console.log(formData)
    if(!modalOption.isEdit) {
      await addEmployee(formData)(dispatch)
    } else {
      await updateEmployee(modalOption.id, formData)(dispatch)
    }
    setModalOption(prevState => ({...prevState, showModal: false}));
    setFormData({
      fullName: '',
      email: '',
      age: 0,
      country: '',
      profilePicture: ''
    })
  }

  const handleCloseModal = () => {
    setModalOption(prevState => ({...prevState, showModal: false}));
    setFormData({
      fullName: '',
      email: '',
      age: 0,
      country: '',
      profilePicture: ''
    })
  }

  
  const handleChangePage = (e, page) => {
    setPageSetting({...pageSetting, currentPage: page});
    console.log(pageSetting)
  }

  const handleOpenEditModal = (employee: EmployeeType) => {
    console.log('employee', employee, employees.filter(info => info.id === modalOption.id)[0])
    setModalOption(prevState => ({...prevState, showModal: true, isEdit: true, id: employee.id}));
    
    setFormData(employees.filter(info => info.id === employee.id)[0]);
  }

  // useEffect(() => {
  //   const startIndex = Math.max(pageSetting.currentPage - Math.floor(pagesToShow / 2), 1);
  //   const endIndex = Math.min(startIndex + pagesToShow - 1, employees.length);
  //   setPageSetting(pageSetting => ({...pageSetting, endPage: endIndex, startPage: startIndex, totalPages: employees.length}))

  // }, [employees.length, pageSetting.currentPage])

  useEffect(() => {
    (async () => {
      await getEmployees()(dispatch);
    })();
  }, [dispatch])

  return(
      <>
        <div className='bg-gray-200 min-h-screen'>
          <Header />
          <div>
            <div className='px-16 py-5'>
              <button className='rounded-full p-5 bg-pink-700 active:bg-pink-500 text-white shadow-md shadow-gray-500/40' onClick={() => setModalOption(prevState => ({...prevState, showModal: true, isEdit: false}))}>
                <FontAwesomeIcon icon={faPlus} className="px-1 text-xl align-center" />
              </button>
              <table className='mt-5 w-full bg-gray-50 min-w-max table-auto shadow-lg shadow-indigo-300/50 text-center rounded-md'>
                <thead>
                  <tr>
                  {
                    tableHeaders.map((value) => (
                      <th 
                        key={value.label}
                        className="border-b-2 border-blue-gray-100 bg-slate-600 text-white p-6 text-left text-lg"
                      >
                        {value.key}
                      </th>
                    ))
                  }
                  </tr>
                </thead>
                <tbody>
                    {
                      employees.length > 0 && 
                      employees.slice((pageSetting.currentPage - 1) * pagesToShow, pagesToShow * pageSetting.currentPage).map((employee, index) => (
                        <tr className='border-b border-blue-white text-center' key={index}>
                          <td className="border-b border-gray-300/80 bg-blue-gray-50 p-6 text-left text-lg flex items-center">
                            <div className='w-[120px] flex items-center'>
                              <img className='w-6/12 mr-5 rounded-full' src={employee.profilePicture.toString()} alt="employeePhoto" />
                              <span>{employee.fullName}</span>
                            </div>
                          </td>
                          <td className="border-b border-gray-300/80 bg-blue-gray-50 p-6 text-left text-lg">
                            {employee.email}
                          </td>
                          <td className="border-b border-gray-300/80 bg-blue-gray-50 p-6 text-left text-lg">
                            {employee.age}
                          </td>
                          <td className="border-b border-gray-300/80 bg-blue-gray-50 p-6 text-left text-lg">
                            {employee.country}
                          </td>
                          <td className="border-b border-gray-300/80 bg-blue-gray-50 p-6 text-left text-lg">
                          <FontAwesomeIcon icon={faPencil} 
                            className="px-1 text-xl align-center mr-3 text-indigo-500 cursor-pointer"
                            onClick={() =>handleOpenEditModal(employee)} />
                          <FontAwesomeIcon icon={faXmark} className="px-1 text-xl align-center text-red-500 cursor-pointer" onClick={async () => await deleteEmployee(employee.id)(dispatch)} />
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
              {modalOption.showModal ? (
                <EmployeeModal 
                  handleSave={handleSave} 
                  handleCloseModal={handleCloseModal}
                  handleFileUpload={handleFileUpload} 
                  handleFileSelected={handleFileSelected}  
                  handleOnChange={handleOnChange}
                  fileInputRef={fileInputRef} 
                  data={formData}
                  isEdit={modalOption.isEdit}
                />) : null}
            </div>
            <div className="text-center flex justify-center pb-8">
              <Pagination 
                count={Math.ceil(employees.length/5)} 
                size="large" 
                variant="outlined" 
                color="primary"
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
        
      </>
    )
}

export default Employee;
