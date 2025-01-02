import React from 'react'
import Title from '../../../components/title/Title'
import { MdIncompleteCircle } from 'react-icons/md'
import profile from '../../../assets/profile.jpg'
import { useGetAllUsersQuery, useGetDataAnalysisQuery } from '../../../redux/feature/auth/authApi'
import RevenueChart from '../../../components/RevenueChart/RevenueChart'
import { useSelector } from 'react-redux'
const AdminDashboard = () => {
  const { data, isLoading, isError, error } = useGetDataAnalysisQuery()
  const { data: users } = useGetAllUsersQuery()
  const userList = Array.isArray(users) ? users : []
  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 m-4 ">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalLoggedinUsers}</span>
            <span className="block text-gray-500">online users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.lastDayVisits}</span>
            <span className="block text-gray-500">Website visits (last day)</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            {/* <span className="inline-block text-2xl font-bold">users</span> */}
            <span className="inline-block text-xl text-gray-500 font-semibold">{data?.monthlyUsersPercentage[0]?.percentage}%</span>
            <span className="block text-gray-500">stay loggedin in This Month</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className='size-6' />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalUsers}</span>
            <span className="block text-gray-500">Total Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className='size-6' />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.inActive}</span>
            <span className="block text-gray-500">monthly Logedout Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className='size-6' />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.password}</span>
            <span className="block text-gray-500">Average Password Strength of Users</span>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">The number users per month</div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <RevenueChart />
            </div>
          </div>
        </div>
        {/* users and students view */}
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Users by average order</span>
            <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Descending
              <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
            <ul className="p-6 space-y-6">
              {
                userList?.length > 0 ?
                  userList.map(user =>
                    <li className="flex items-center" key={user._id}>
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img src={profile} alt="Annette Watson profile picture" />
                      </div>
                      <span className="text-gray-600">{user.userName}</span>
                      <span className="ml-auto font-semibold">{user.role}</span>
                    </li>
                  )
                  : <p>NO User Found.</p>
              }
            </ul>
          </div>
        </div>
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">users by type of Role</div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
          </div>
        </div>
      </section>

    </>
  )
}

export default AdminDashboard
