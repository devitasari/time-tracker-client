import './style.css';
import {  useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/index';
import Summary from '../../components/summary';

export default function Home() {
    const [members, setMembers] = useState('');
    const [listMembers, setListMembers] = useState([]);

    const history = useHistory();
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }

        axios({
            url: '/members',
            method: 'GET',
            headers: {
                token: token
            }
        })
            .then(({ data }) => {
                setListMembers(data.members);
            })
            .catch(console.log);
        
    }, [])

    function onSubmit(e) {
        e.preventDefault();

        axios({
            url: '/members',
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
                <Summary/>
            </div>
        </div>
    )
}
