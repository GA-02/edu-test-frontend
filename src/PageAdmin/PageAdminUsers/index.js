import React from 'react';
import './style.css';

class PageMain extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }



    }

    componentDidMount() {
        let dataMethod = new FormData();
        dataMethod.append('email', localStorage.getItem('email'));
        dataMethod.append('password', localStorage.getItem('password'));
        fetch('http://edu-testback-end.com/users/getUsers.php', {
            method: "POST",
            body: dataMethod
        })
            .then(response => response.json())
            .then(response => {
                if (response['error'])
                    throw (response['error']);
                this.setState(() => {
                    return {
                        users: response
                    }});

            })
            .catch(error => console.log(error))
    }

    // Sort = (items, sortColumn, setItems) => {
    //     let newMas = [...items];
    //     items.sort((prev, next) => {
    //         if (isNaN(Object.values(prev)[sortColumn]) || isNaN(Object.values(next)[sortColumn]))
    //             if (Object.values(prev)[sortColumn] < Object.values(next)[sortColumn]) return -1;
    //             else return 1;
    //         if (+Object.values(prev)[sortColumn] < +Object.values(next)[sortColumn]) return -1;
    //     });
    //     if (JSON.stringify(newMas) == JSON.stringify(items)) {
    //         items.reverse();
    //     }
    //     newMas = [...items];
    //     this.setState(()=>{
    //         return {
    //             users: newMas,
    //         }
    //     })
    //     setItems(newMas);
    // }

    render() {
        return (
            <div className='page__admin__users'>
                <div className="site__content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Наименование</th>
                                <th>Почта</th>
                                <th>Пароль</th>
                                <th>Роль</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(item => <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.role}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PageMain