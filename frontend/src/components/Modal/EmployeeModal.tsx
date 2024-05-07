import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { countries } from 'countries-list';

const EmployeeModal = ({handleCloseModal,handleOnChange, handleSave, handleFileUpload, fileInputRef, handleFileSelected, data, isEdit }) => {
  const countryNames = Object.values(countries).map((country) => country.name);
  console.log(data)
  
  
  return(
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-8/12 my-6 mx-auto max-w-6xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {isEdit ? "Edit Employee" : "Add Employee"}
              </h3>
              <button
                className="p-1 ml-auto border-0 text-black opacity-7 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleCloseModal}
              >
                <FontAwesomeIcon icon={faXmark} className="px-1 text-2xl align-center text-black" />
              </button>
            </div>
            <div className="relative p-6 flex">
              <form className="w-full">
                <div>
                <div onClick={handleFileUpload} className='w-3/12 text-center bg-gray-200/75 py-8 rounded-md'>
                  {
                    data?.profilePicture ? <img src={data.profilePicture} alt="employeePhoto" /> : <FontAwesomeIcon icon={faCloudArrowUp} className="px-1 text-6xl text-gray-400 align-center" /> 
                  }
                  
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileSelected}
                />
                </div>
                <div className="flex my-5">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    name="fullName"
                    value={data.fullName}
                    className="w-6/12 py-3 mr-3 border border-sm px-3 rounded-md focus:outline-none" 
                    onChange={handleOnChange}
                  />
                  <input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-6/12 py-3 ml-3 border border-sm px-3 rounded-md focus:outline-none" 
                  />
                </div>
                <div className="flex my-5">
                  <input 
                    type="number" 
                    placeholder="Age" 
                    name="age"
                    value={data.age}
                    onChange={handleOnChange}
                    className="w-6/12 py-3 mr-3 border border-sm px-3 rounded-md focus:outline-none" 
                  />
                  <select
                    id="country"
                    name="country"
                    onChange={handleOnChange}
                    defaultValue={data.country}
                    className="w-6/12 px-4 py-2 ml-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  >
                    {
                      countryNames.map((name, index) => (
                        <option key={index}>{name}</option>
                      ))
                    }
                  </select>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSave}
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default EmployeeModal