import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {PROJECT_STATUS_TEXT_MAP ,PROJECT_STATUS_CLASS_MAP} from '../../constante.jsx'
import TextInput from '@/Components/TextInput';
import SelectInpute from '@/Components/SelectInpute.jsx';
import { ChevronUpIcon,ChevronDownIcon } from '@heroicons/react/16/solid'


export default function index({ auth , projects , queryParams = null }){
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
      if (value) {
        queryParams[name] = value;
      } else {
        delete queryParams[name];
      }
  
      router.get(route("project.index"), queryParams);
    };
    const onKeyPress = (name , e)=>{
        if(e.key != 'Enter') return ;
        searchFieldChanged(name,e.target.value)
    }
    const sortChanged = (name)=>{
        if(name === queryParams.sort_field){
            if(queryParams.sort_field === 'asc'){
                queryParams.sort_direction = 'desc'
            }
            else {
                queryParams.sort_direction = 'asc'
            }
        }else {
            queryParams.sort_field = name ;
            queryParams.sort_direction = 'asc';
        }
        router.get(route("project.index"), queryParams);
    }
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
                    <div className='overflow-auto'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>  
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gay-500'>
                            <tr>
                                <th className='px-3 py-2' >

                                </th>
                                <th className='px-3 py-2'>
                                
                                </th>
                                <th className='px-3 py-2'>
                                <TextInput 
                                defaultValue ={queryParams.name}
                                className="w-full" 
                                plcholder="Project Name" 
                                onBlur={e=> searchFieldChanged('name' , e.target.value)}
                                onKeyPress= {e => onKeyPress('name' , e.target.value)} 
                                />
                                </th>
                                <th className='px-3 py-2' > 
                                    <SelectInpute 
                                    onChange={ e => searchFieldChanged('status' , e.target.value)}
                                    defaultValue ={queryParams.name}
                                    >
                                        <option value=''>Select staus</option>
                                        <option value='pending'>Pending</option>
                                        <option value='in_progress'>In Progress</option>
                                        <option value='completed'>Completed</option>
                                    </SelectInpute>
                                </th>
                                <th className='px-3 py-2'> 
                                     </th>  
                                <th className='px-3 py-2'> 
                                </th>  
                                <th className='px-3 py-2'> 
                                    
                                </th>  
                                <th className='px-3 py-2'> 
                            
                             </th>  
                            </tr>
                        </thead> 
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gay-500'>
                            <tr>
                                <th  onClick = {()=> sortChanged('id')} className='px-3 py-2 flex flex-items-center justify-between gap-1'  >
                                Id  <ChevronUpIcon className='w-4' />< ChevronDownIcon  className='w-4 -mt-2' /> 
                                </th>
                                    
                                <th  className='px-3 py-2'>Image</th>
                                <th onClick={() => sortChanged('name')} className='px-3 py-2'>name</th>
                                <th onClick = {()=> sortChanged('status')} className='px-3 py-2' > status</th>
                                <th onClick = {()=> sortChanged('created_at')} className='px-3 py-2'> Created date </th>  
                                <th onClick = {()=> sortChanged('due_date')} className='px-3 py-2'> Due date</th>  
                                <th className='px-3 py-2'> Create by</th>  
                                <th  className='px-3 py-2'> Actions </th>  
                            </tr>
                         </thead>
                        <tbody>
                            {
                               projects.data.map((project)=>(
                                <tr  key={project.id}  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <th className='px-3 py-2'> {project.id}</th>
                                    <td className='px-3 py-2'> 
                                        <img style={{width:60}} src={project.image_path} alt="" />
                                    </td>
                                    <td className='px-3 py-2'> {project.name}</td>
                                    <td className='px-3 py-2'> 
                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </span>                                           
                                    </td>    
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
                    </div>
                    <Pagination links={projects.meta.links}/>
                </div>
            </div>
        </div>
    </div>
           
    </AuthenticatedLayout>
    );
}