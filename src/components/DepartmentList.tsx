// src/components/DepartmentListUI.tsx
import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  department: string;
  sub_departments: { id: number; name: string }[];
}

interface DepartmentListUIProps {
  data: Department[];
}

const DepartmentListUI: React.FC<DepartmentListUIProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleExpand = (id: number) => {
    setExpanded((prevExpanded) => (prevExpanded === id ? null : id));
  };

  const handleSelectDepartment = (id: number) => {
    setSelectedDepartments((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If the department is already selected, remove it and all sub-departments
        return prevSelected.filter(
          (deptId) =>
            deptId !== id &&
            !data.find((dept) => dept.id === id)?.sub_departments.map((subDept) => subDept.id).includes(deptId)
        );
      } else {
        // If the department is not selected, add it and all sub-departments
        const department = data.find((dept) => dept.id === id);
        if (department) {
          const subDeptIds = department.sub_departments.map((subDept) => subDept.id);
          return [...prevSelected, id, ...subDeptIds];
        }
        return prevSelected;
      }
    });
  };

  const handleSelectSubDepartment = (subDeptId: number) => {
    setSelectedDepartments((prevSelected) => {
      if (prevSelected.includes(subDeptId)) {
        // If the sub-department is already selected, remove it
        return prevSelected.filter((deptId) => deptId !== subDeptId);
      } else {
        // If the sub-department is not selected, add it
        return [...prevSelected, subDeptId];
      }
    });
  };

  const isDepartmentSelected = (id: number) => {
    const department = data.find((dept) => dept.id === id);
    if (department) {
      return department.sub_departments.every((subDept) => selectedDepartments.includes(subDept.id));
    }
    return false;
  };

  const isSubDepartmentSelected = (subDepartments: { id: number; name: string }[]) => {
    return subDepartments.every((subDept) => selectedDepartments.includes(subDept.id));
  };

  const renderSubDepartments = (subDepartments: { id: number; name: string }[]) => {
    return subDepartments.map((subDept) => (
      <ListItem key={subDept.id} style={{ display: 'flex', alignItems: 'center', paddingLeft: 40 }}>
        <Checkbox
          checked={selectedDepartments.includes(subDept.id)}
          onChange={() => handleSelectSubDepartment(subDept.id)}
          indeterminate={false}
          disableRipple
        />
        <ListItemText primary={subDept.name} />
      </ListItem>
    ));
  };

  const renderDepartments = () => {
    return data.map((dept) => (
      <React.Fragment key={dept.id}>
        <ListItem
          button
          onClick={() => handleExpand(dept.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 5,
            mb: 1,
            '&:hover': { bgcolor: '#e0e0e0' },
          }}
        >
          <Checkbox
            checked={isDepartmentSelected(dept.id)}
            onChange={() => handleSelectDepartment(dept.id)}
            indeterminate={isSubDepartmentSelected(dept.sub_departments)}
            disableRipple
          />
          <ListItemText primary={dept.department} />
          {expanded === dept.id ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expanded === dept.id} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubDepartments(dept.sub_departments)}
          </List>
        </Collapse>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Department List
      </Typography>
      <List component="nav">{renderDepartments()}</List>
    </div>
  );
};

export default DepartmentListUI;
