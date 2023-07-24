import React, { useState } from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SubDepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  department: string;
  sub_departments: SubDepartment[];
}

interface DepartmentListUIProps {
  data: Department[];
}

const DepartmentListUI: React.FC<DepartmentListUIProps> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleToggle = (itemId: number) => () => {
    const currentIndex = selectedItems.indexOf(itemId);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const isItemSelected = (itemId: number) => selectedItems.indexOf(itemId) !== -1;

  const handleSelectAllSubDepartments = (department: Department) => {
    const allSubDepartmentsIds = department.sub_departments.map((subDept) => subDept.id);
    const newSelectedItems = selectedItems.includes(department.id)
      ? selectedItems.filter((id) => id !== department.id)
      : [...selectedItems, department.id, ...allSubDepartmentsIds];
    setSelectedItems(newSelectedItems);
  };

  const renderDepartment = (department: Department) => (
    <React.Fragment key={department.id}>
      <ListItem button onClick={handleToggle(department.id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isItemSelected(department.id)}
            tabIndex={-1}
            disableRipple
            color="primary"
            onClick={() => handleSelectAllSubDepartments(department)}
          />
        </ListItemIcon>
        <ListItemText
          primary={department.department}
          secondary={isItemSelected(department.id) ? <ExpandLess /> : <ExpandMore />}
        />
      </ListItem>
      <Collapse in={isItemSelected(department.id)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {department.sub_departments.map((subDept) => (
            <ListItem key={subDept.id} button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isItemSelected(subDept.id)}
                  tabIndex={-1}
                  disableRipple
                  color="primary"
                  onClick={handleToggle(subDept.id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={subDept.name}
                secondary={isItemSelected(subDept.id) ? <ExpandLess /> : <ExpandMore />}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );

  return (
    <List component="nav">
      {data.map((department) => renderDepartment(department))}
    </List>
  );
};

export default DepartmentListUI;
