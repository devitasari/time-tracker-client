import React, { useEffect, useState } from 'react';
import axios from '../axios/index';
import { Pie } from 'react-chartjs-2';

export default function Summary() {
    const [summary, setSummary] = useState({});
    const [repo, setRepo] = useState('');
    const [labels, setLabels] = useState([]);
    const [seconds, setSeconds] = useState([]);
    let backgroundColor = [];
    let hoverBackgroundColor = [];
    // 'rgba(52, 152, 219,1.0)'

    for (let i = 0; i < seconds.length; i++) {
        const secondToString = seconds[i].toString();
        backgroundColor.push(`rgba(${secondToString.substring(0,2)}, ${secondToString.substring(1,3)}, ${secondToString.substring(0,3)}, 1.0)`);
        hoverBackgroundColor.push(`rgba(${secondToString.substring(0,2)}, ${secondToString.substring(1,3)}, ${secondToString.substring(0,3)}, 0.5)`);
    }

    let state;
    if (labels) {
        state = {
            labels: labels,
            datasets: [
                {
                  label: 'Rainfall',
                  backgroundColor: backgroundColor,
                  hoverBackgroundColor: hoverBackgroundColor,
                  data: seconds
                }
              ]
          }
    }

    const token = localStorage.getItem('token');

    useEffect(() => {

        axios({
            url:'/members/summary',
            method: 'GET',
            headers: {
                token: token
            }
        })
            .then(({ data }) => {
                setSummary(data);
                let name = [];
                let seconds = [];
                data.newData.map(el => {
                    name.push(el.name);
                    seconds.push(el.seconds)
                })
                setLabels(name);
                setSeconds(seconds)
            })
            .catch(console.log);

    }, []);

    function onChange(e) {
        const value = e.target.value;
        setRepo(value);
    }

    return (
        <>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <form>
                        <div className="mt-3">
                            <label htmlFor="">Repo</label>
                            <input type="text" className="form-control" value={repo} onChange={onChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>  
                    </form>
                </div>
            </div>
            <div className="row">
                {summary && (
                    <Pie
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    />
                )}
            </div>
        </>
    )
}
