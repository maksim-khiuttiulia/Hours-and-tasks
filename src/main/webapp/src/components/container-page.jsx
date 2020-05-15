import React, { Component } from 'react'
import Task from './task'
import TaskAddForm from './task-add'
import TaskDeleteDialog from './task-delete-dialog'
import TaskAddDialog from './task-add-dialog'
import { ListGroup, ListGroupItem, Spinner, Button, Icon } from 'reactstrap';
import { getAllTasks, saveNewTask, changeTaskStatus, deleteTask } from '../services/task-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'