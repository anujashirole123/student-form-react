import { useState, useEffect } from "react";
import "./App.css";
import Toast from "./Toast";

export default function App() {

  const [dark,setDark] = useState(false);
  const [toast,setToast] = useState("");
  const [showList,setShowList] = useState(false);

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    gender:"",
    course:"",
    skills:[]
  });

  const [data,setData] = useState([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("students"));
    if(saved) setData(saved);
  },[]);

  const saveLocal = (list)=>{
    setData(list);
    localStorage.setItem("students",JSON.stringify(list));
  };

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSkill=(e)=>{
    const {value,checked}=e.target;
    if(checked)
      setForm({...form,skills:[...form.skills,value]});
    else
      setForm({...form,skills:form.skills.filter(s=>s!==value)});
  };

  const submit=(e)=>{
    e.preventDefault();

    if(!form.name) return setToast("Name required");
    if(!form.email.includes("@")) return setToast("Valid email required");
    if(form.password.length<6) return setToast("Password min 6");

    const updated=[...data,form];
    saveLocal(updated);

    setToast("Submitted Successfully ✅");
    setShowList(true);

    setForm({
      name:"",
      email:"",
      password:"",
      gender:"",
      course:"",
      skills:[]
    });
  };

  return (
    <div className={dark?"dark container":"container"}>

      <button className="toggle" onClick={()=>setDark(!dark)}>
        {dark?"Light Mode ☀":"Dark Mode 🌙"}
      </button>

      <h1>Student Registration</h1>

      <form className="card" onSubmit={submit}>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="group">
          Gender:
          {["Male","Female"].map(g=>(
            <label key={g}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={form.gender===g}
                onChange={handleChange}
              /> {g}
            </label>
          ))}
        </div>

        <select name="course" value={form.course} onChange={handleChange}>
          <option value="">Course</option>
          <option>BCA</option>
          <option>BBA</option>
          <option>BTech</option>
          <option>MBA</option>
        </select>

        <div className="group">
          Skills:
          {["HTML","CSS","JavaScript","React"].map(s=>(
            <label key={s}>
              <input
                type="checkbox"
                value={s}
                checked={form.skills.includes(s)}
                onChange={handleSkill}
              /> {s}
            </label>
          ))}
        </div>

        <button>Submit</button>
      </form>

      {showList && (
      <div className="list">
        {data.map((d,i)=>(
          <div className="box" key={i}>
            <p><b>{d.name}</b></p>
            <p>{d.email}</p>
            <p>{d.gender} | {d.course}</p>
            <p>{d.skills.join(", ")}</p>
          </div>
        ))}
      </div>
      )}

      {toast && <Toast msg={toast} clear={()=>setToast("")}/>}

    </div>
  );
}