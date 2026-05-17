
import { useState, useEffect } from "react";

const employeesDB = [
  { id: "101", name: "Amit Sharma", role: "Frontend", hourlyRate: 40 },
  { id: "102", name: "Priya Patel", role: "Backend", hourlyRate: 50 },
  { id: "103", name: "Rahul Verma", role: "DevOps", hourlyRate: 60 },
  { id: "104", name: "Neha Singh", role: "QA", hourlyRate: 35 },
  { id: "105", name: "Kabir Das", role: "Frontend", hourlyRate: 45 },
  { id: "106", name: "Sneha Gupta", role: "Backend", hourlyRate: 55 },
  { id: "107", name: "Vikram Reddy", role: "DevOps", hourlyRate: 65 },
  { id: "108", name: "Pooja Iyer", role: "QA", hourlyRate: 30 },
];


function ProjectAllocation(){

    const [employees, setEmployees] = useState(employeesDB);
    const [empInProject, setEmpInProject] = useState([]);

    const[searchTerm, setSearchTerm] = useState("");
    const[selectedRoles, setSelectedRoles] = useState([]);

    function addToProject(emp){
        const newEmp = {
            ...emp,
            workHours: 10
        }
        setEmpInProject((prev) => [...prev, newEmp]);
    }

    function increaseWorkingHours(id){
        const targetEmp = empInProject.find((e) => e.id === id)
        if(targetEmp.workHours >= 40){
            window.alert("Cannot increase more than 40 hrs")
            return
        }
         setEmpInProject((prev) =>
            prev.map((e) => e.id === id ? {...e, workHours: e.workHours+1} : e)
        )

    }

    function decreaseWorkingHours(id){
        setEmpInProject((prev) =>
            prev.map((e) => e.id === id ? {...e, workHours: e.workHours-1} : e).filter((e) => e.workHours>0)
        )
    }

    function handleFilter(role){
        setSelectedRoles((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        )
    }
    const rolesArr = [... new Set(employeesDB.map((e) => e.role))]
    console.log(rolesArr);

    // this is brute forces soultion for filter ye follow mat karna
    useEffect(() => {
        const result = employeesDB.filter((emp)=>
        {
            const matchedSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchedRole = selectedRoles.length === 0 || selectedRoles.includes(emp.role);

            return matchedRole && matchedSearch;
        }
        )
        setEmployees(result) 
    }, [searchTerm, selectedRoles])

    

    return(
        <div>
            <h1>Project Allocator</h1>

            <h3>List of employess</h3>
            <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            {rolesArr.map((r) => 
            <label key={r}>
                {r}
            <input
            type="checkbox"
            value={r}
            checked={selectedRoles.includes(r)}
            onChange={() => handleFilter(r)}
            />
            </label> 
            )}

            <ul>
                {employees.map((emp) => {
                    const isEmployeeInProject = empInProject.find((e) => e.id === emp.id)
                    return (
                <li key={emp.id}>
                    <span>
                    {emp.name} - {"HourlyRate: " + emp.hourlyRate + " $/hr"}  - {"Role: " + emp.role}
                    {" "}
                    { isEmployeeInProject ? (
                        <span>
                        <button onClick={()=> increaseWorkingHours(isEmployeeInProject.id)} >+</button>
                        {isEmployeeInProject.workHours}
                        <button onClick={()=> decreaseWorkingHours(isEmployeeInProject.id)} >-</button>
                        </span>
                ) : (<button onClick={() => addToProject(emp)} >Add To Project</button>) }
                    
                    </span>
                </li>
)})}
            </ul>
            <h3>List of employees in Project</h3>
            <ul>
                {empInProject.map((emp) => 
                <li key={emp.id}>
                    {emp.name} - {"Work Hours: " + emp.workHours + "hr"}
                </li>
                )}
            </ul>
        </div>
    )

}
export default ProjectAllocation;