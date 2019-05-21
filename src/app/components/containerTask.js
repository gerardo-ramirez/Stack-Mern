import React, { Component } from 'react';



class ContainerTask extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''



        },
            this.addTasks = this.addTasks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);



    };
    componentDidMount() {

        this.fetchTasks()

    };
    fetchTasks() {
        fetch('/api/tasks/').then(res => res.json())
            .then(data => this.setState({
                tasks: data
            }))

    };
    //Agregar tareas :
    addTasks(e) {

        //NO necesito esto : http://localhost:8080 pues ya uso el mismo port

        fetch('/api/tasks/add', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'appication/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => console.log(data),
            M.toast({ html: 'Tarea guardada' }),
            this.setState({ title: '', description: '' }),
            this.fetchTasks()

        )


            .catch(err => console.log(err));
        console.log(this.state);



        e.preventDefault();

    };

    //************************** */
    //actualizar 
    updateTask(id) {
        fetch(`/api/tasks/${id}`).then(res => res.json()).then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
        document.getElementById('update').style.display = 'initial';
        document.getElementById('sumitir').style.display = 'none';



    };

    //*****/************************************************ */
    editTask(id) {

        if (confirm('esta seguro de editar?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'appication/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => console.log(data),
                M.toast({ html: 'Tarea Actualizada' })
            );




        }
        document.getElementById('update').style.display = 'none';
        document.getElementById('sumitir').style.display = 'initial';
        this.fetchTasks();
    }




    //************************************************
    //Borrar  tareas:
    deleteTask(id) {
        if (confirm('esta seguro de eliminar?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'appication/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => console.log(data),
                M.toast({ html: 'Tarea eliminada' })
            );




        } this.fetchTasks();
    }
    //*******************************************

    //capturar evento 
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }





    //fin funciones del formulario --------------------------------



    render() {
        return (
            <div className='container' >
                <div className='row' >
                    {/*Aqui comienza el formulario */}
                    <div className='col s5'>
                        <div className='card'>
                            <div className='card-content'>
                                <form onSubmit={this.addTasks}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input type='text' name='title' placeholder='title' value={this.state.title} onChange={this.handleChange} />
                                        </div>
                                        <div className='input-field col s12'>
                                            <textarea placeholder='description' name='description' value={this.state.description} className='materialize-textarea' onChange={this.handleChange}></textarea>
                                        </div>
                                        <div  >
                                            <input type='submit' id='sumitir' value="send" className='btn light-blue darken-4' />
                                            <input type='button' id='update' value="update" style={{ display: 'none' }} className='btn light-lime darken-3' onClick={() => this.editTask(this.state._id)} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/*Aqui termina el formulario */}

                    {/* Desde aqui la tabla */}

                    <div className='col s7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descripcion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map((task) => {
                                    return (
                                        <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button className='btn light-blue darken-4 ' onClick={() => this.updateTask(task._id)}><i className='material-icons'>edit</i></button>
                                                <button className='btn light-blue darken-4 ' style={{ margin: '3px' }} onClick={() => this.deleteTask(task._id)}><i className='material-icons'>delete</i></button>

                                            </td>

                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>

                    </div>



                    {/* Hasta aqui la tabla */}



                </div>
            </div>
        )
    }
};
export default ContainerTask;