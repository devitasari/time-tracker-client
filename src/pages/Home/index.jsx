 import './style.css';
import {  useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [members, setMembers] = useState('');
    const [repo, setRepo] = useState('');
    const [listMembers, setListMembers] = useState([]);

    const history = useHistory();
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }

        axios({
            url: 'http://localhost:3100/members',
            method: 'GET',
            headers: {
                token: token
            }
        })
            .then(({ data }) => {
                setListMembers(data.members);
                console.log(data, "<< list members");
            })
            .catch(console.log);
        
    }, [])

    if (listMembers) {
        console.log(listMembers, "<<< state");
    }

    function onSubmit(e) {
        e.preventDefault();

        axios({
            url: 'http://localhost:3100/members',
            method: 'POST',
            headers: {
                token: token
            },
            data: {
                data: members
            }
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(console.log)
    }

    function onChange(e) {
        const value = e.target.value;
        setMembers(value);
    }

    function onChange1(e) {
        const value = e.target.value;
        setRepo(value);
    }

    return (
        <div className="container home">
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={onSubmit}>
                        <div className="mt-5">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Input Member</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" onChange={onChange} name='members' value={members} rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>  
                    </form>
                </div>
                <div className="col-lg-6">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listMembers && 
                            listMembers.map(member => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                </tr>
                            )    
                        )}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <form>
                        <div className="mt-3">
                            <label htmlFor="">Repo</label>
                            <input type="text" className="form-control" value={repo} onChange={onChange1}/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>  
                    </form>
                </div>
            </div>
        </div>
    )
}
