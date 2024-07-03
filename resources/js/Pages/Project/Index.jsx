import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function index({ auth , projects}){
    return (
    <AuthenticatedLayout
    user={auth.user}
    header={
        <h2  className="font-semibold
        text-xl
        text-gray-800
        dark:text-gray-200
        leading-tight">Projects</h2>}
        >
    <Head title="projects" />
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gay-500'>
                            <tr>
                                <th className='px-3 py-2'> Id </th>
                                <th className='px-3 py-2'> Image </th>  
                                <th className='px-3 py-2' > Name </th>  
                                <th className='px-3 py-2'> Staus </th>  
                                <th className='px-3 py-2'> Created date </th>  
                                <th className='px-3 py-2'> Due date</th>  
                                <th className='px-3 py-2'> Create by</th>  
                                <th className='px-3 py-2'> Actions </th>  
                            </tr>
                        </thead>
                        <tbody>
                            {
                               projects.data.map((project)=>(
                                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <th className='px-3 py-2'> {project.id}</th>
                                    <td className='px-3 py-2'> 
                                        <img style={{width:60}} src={project.image_path} alt="" />
                                    </td>
                                    <td className='px-3 py-2'> {project.name}</td>
                                    <td className='px-3 py-2'> {project.status}</td>    
                                    <td className='px-3 py-2'> {project.created_at}</td>
                                    <td className='px-3 py-2'> {project.due_date}</td>
                                    <td className='px-3 py-2'> {project.createdBy.name}</td>
                                    <td
                                    className='px-3 py-2'
                                    >
                                        <Link
                                        className='font-meduim text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                        href={route('project.edit' , project.id)}
                                        >Edit</Link>

                                        <Link 
                                        className='font-meduim text-red-600 dark:text-red-500 hover:underline mx-1'
                                        href={route('project.destroy' , project.id)}
                                        >Delete</Link>

                                        <Link
                                        className='font-meduim text-amber-300 dark:text-yallow-500 hover:underline mx-1'
                                        href={route('project.show' , project.id)}
                                        >Visite</Link>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination links={projects.meta.links}/>
                </div>
            </div>
        </div>
    </div>
           
    </AuthenticatedLayout>
    );
}