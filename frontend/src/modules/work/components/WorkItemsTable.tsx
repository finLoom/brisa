// frontend/src/modules/work/components/WorkItemsTable.tsx
import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  Checkbox,
  Button,
  Input,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuButton,
  mergeClasses
} from '@fluentui/react-components';
import {
  ChevronDown20Regular,
  ChevronUp20Regular,
  Filter20Regular,
  Search20Regular,
  Column20Regular,
  ArrowImport20Regular,
  Recycle20Regular,
  Open20Regular,
  Add20Regular,
  Dismiss12Regular,
  ChevronDown16Regular
} from '@fluentui/react-icons';

// Create styles for the table with NO borders
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    borderBottom: '1px solid #f5f5f5',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  toolbar: {
    display: 'flex',
    padding: '8px 16px',
    borderBottom: '1px solid #f5f5f5',
    alignItems: 'center',
    gap: '8px',
  },
  toolbarButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  filterBar: {
    display: 'flex',
    padding: '8px 16px',
    borderBottom: '1px solid #f5f5f5',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxWidth: '400px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '8px',
    color: '#616161',
  },
  filterChips: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginLeft: '16px',
  },
  filterChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    fontSize: '12px',
  },
  closeIcon: {
    fontSize: '12px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: 'none',
    boxShadow: 'none',
  },
  headerRow: {
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#616161',
    borderBottom: '1px solid #f5f5f5',
  },
  headerCell: {
    padding: '8px 12px',
    fontWeight: '600',
    cursor: 'pointer',
    position: 'relative',
    border: 'none',
  },
  sortIcon: {
    marginLeft: '4px',
    verticalAlign: 'middle',
  },
  row: {
    borderBottom: '1px solid #f5f5f5',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    }
  },
  cell: {
    padding: '8px 12px',
    fontSize: '14px',
    verticalAlign: 'middle',
    border: 'none',
  },
  iconCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemIcon: {
    color: '#f2c811',
    fontSize: '14px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#0078d4',
    display: 'inline-block',
    marginRight: '8px',
  },
  assignee: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
  },
  commentsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }
});

// Define the WorkItem interface
interface WorkItem {
  id: string;
  title: string;
  assignedTo: {
    name: string;
    avatar?: string;
    department?: string;
  };
  state: string;
  areaPath: string;
  tags?: string[];
  comments: number;
  activityDate: string;
}

// Define props for the component
interface WorkItemsTableProps {
  items: WorkItem[];
  onItemClick?: (item: WorkItem) => void;
  onSelectionChange?: (selectedItems: WorkItem[]) => void;
}

export const WorkItemsTable: React.FC<WorkItemsTableProps> = ({
  items,
  onItemClick,
  onSelectionChange
}) => {
  const styles = useStyles();

  // State for sorting
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State for selection
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // State for search and filters
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<{
    type: string;
    assignedTo: string;
    state: string;
    area: string;
    tags: string[];
  }>({
    type: '',
    assignedTo: '',
    state: '',
    area: '',
    tags: []
  });

  // Handle sort changes
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle item selection
  const handleItemSelect = (item: WorkItem, selected: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (selected) {
      newSelectedItems.add(item.id);
    } else {
      newSelectedItems.delete(item.id);
    }

    setSelectedItems(newSelectedItems);

    if (onSelectionChange) {
      onSelectionChange(items.filter(item => newSelectedItems.has(item.id)));
    }
  };

  // Handle select all
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = new Set(items.map(item => item.id));
      setSelectedItems(allIds);

      if (onSelectionChange) {
        onSelectionChange([...items]);
      }
    } else {
      setSelectedItems(new Set());

      if (onSelectionChange) {
        onSelectionChange([]);
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Handle removing a filter
  const handleRemoveFilter = (filterType: keyof typeof activeFilters, value?: string) => {
    if (filterType === 'tags' && value) {
      setActiveFilters(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== value)
      }));
    } else {
      setActiveFilters(prev => ({
        ...prev,
        [filterType]: ''
      }));
    }
  };

  // Sort and filter items
  const filteredItems = useMemo(() => {
    // Apply search and filters
    let result = [...items];

    // Apply search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (activeFilters.state) {
      result = result.filter(item => item.state === activeFilters.state);
    }

    if (activeFilters.assignedTo) {
      result = result.filter(item => item.assignedTo.name === activeFilters.assignedTo);
    }

    if (activeFilters.area) {
      result = result.filter(item => item.areaPath === activeFilters.area);
    }

    if (activeFilters.tags.length > 0) {
      result = result.filter(item =>
        item.tags && activeFilters.tags.some(tag => item.tags?.includes(tag))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortColumn as keyof WorkItem];
      const bValue = b[sortColumn as keyof WorkItem];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      // Default comparison (fallback)
      return 0;
    });

    return result;
  }, [items, searchText, activeFilters, sortColumn, sortDirection]);

  // Check if all visible items are selected
  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every(item => selectedItems.has(item.id));

  // Check if some but not all visible items are selected
  const someSelected =
    selectedItems.size > 0 &&
    !allSelected &&
    filteredItems.some(item => selectedItems.has(item.id));

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Work Items</h2>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="subtle"
              icon={<ChevronDown16Regular />}
            >
              Recently updated
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Recently updated</MenuItem>
              <MenuItem>Recently created</MenuItem>
              <MenuItem>Recently resolved</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Button
          className={styles.toolbarButton}
          appearance="subtle"
          icon={<Add20Regular />}
        >
          New Work Item
        </Button>

        <Button
          className={styles.toolbarButton}
          appearance="subtle"
          icon={<Open20Regular />}
        >
          Open in Queries
        </Button>

        <Button
          className={styles.toolbarButton}
          appearance="subtle"
          icon={<Column20Regular />}
        >
          Column Options
        </Button>

        <Button
          className={styles.toolbarButton}
          appearance="subtle"
          icon={<ArrowImport20Regular />}
        >
          Import Work Items
        </Button>

        <Button
          className={styles.toolbarButton}
          appearance="subtle"
          icon={<Recycle20Regular />}
        >
          Recycle Bin
        </Button>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchInput}>
          <Search20Regular className={styles.searchIcon} />
          <Input
            placeholder="Filter by keyword"
            value={searchText}
            onChange={handleSearchChange}
            style={{ paddingLeft: '30px' }}
          />
        </div>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">
              Types <ChevronDown16Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Task</MenuItem>
              <MenuItem>Bug</MenuItem>
              <MenuItem>Epic</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">
              Assigned to <ChevronDown16Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Anyone</MenuItem>
              <MenuItem>Assigned to me</MenuItem>
              <MenuItem>Unassigned</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">
              States <ChevronDown16Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Active</MenuItem>
              <MenuItem>Resolved</MenuItem>
              <MenuItem>Closed</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">
              Area <ChevronDown16Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Operations</MenuItem>
              <MenuItem>Development</MenuItem>
              <MenuItem>Marketing</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">
              Tags <ChevronDown16Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Priority</MenuItem>
              <MenuItem>Performance</MenuItem>
              <MenuItem>Security</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        {/* Render active filters as chips */}
        {Object.entries(activeFilters).some(([key, value]) =>
          value && (Array.isArray(value) ? value.length > 0 : true)
        ) && (
          <div className={styles.filterChips}>
            {activeFilters.state && (
              <div className={styles.filterChip}>
                State: {activeFilters.state}
                <Dismiss12Regular
                  className={styles.closeIcon}
                  onClick={() => handleRemoveFilter('state')}
                />
              </div>
            )}

            {activeFilters.assignedTo && (
              <div className={styles.filterChip}>
                Assigned to: {activeFilters.assignedTo}
                <Dismiss12Regular
                  className={styles.closeIcon}
                  onClick={() => handleRemoveFilter('assignedTo')}
                />
              </div>
            )}

            {activeFilters.area && (
              <div className={styles.filterChip}>
                Area: {activeFilters.area}
                <Dismiss12Regular
                  className={styles.closeIcon}
                  onClick={() => handleRemoveFilter('area')}
                />
              </div>
            )}

            {activeFilters.tags.map(tag => (
              <div key={tag} className={styles.filterChip}>
                Tag: {tag}
                <Dismiss12Regular
                  className={styles.closeIcon}
                  onClick={() => handleRemoveFilter('tags', tag)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <table className={styles.table} cellSpacing="0" cellPadding="0">
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell} style={{ width: '40px' }}>
              <Checkbox
                checked={allSelected}
                onChange={(e, data) => handleSelectAll(!!data.checked)}
                style={{ opacity: 0.8 }}
              />
            </th>
            <th
              className={styles.headerCell}
              style={{ width: '60px' }}
              onClick={() => handleSort('id')}
            >
              ID
              {sortColumn === 'id' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('title')}
            >
              Title
              {sortColumn === 'title' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('assignedTo')}
            >
              Assigned To
              {sortColumn === 'assignedTo' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('state')}
            >
              State
              {sortColumn === 'state' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('areaPath')}
            >
              Area Path
              {sortColumn === 'areaPath' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('tags')}
            >
              Tags
              {sortColumn === 'tags' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('comments')}
            >
              Comments
              {sortColumn === 'comments' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
            <th
              className={styles.headerCell}
              onClick={() => handleSort('activityDate')}
            >
              Activity Date
              {sortColumn === 'activityDate' && (
                sortDirection === 'asc' ?
                  <ChevronUp20Regular className={styles.sortIcon} /> :
                  <ChevronDown20Regular className={styles.sortIcon} />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr
              key={item.id}
              className={styles.row}
              onClick={() => onItemClick && onItemClick(item)}
              style={{ cursor: onItemClick ? 'pointer' : 'default' }}
            >
              <td
                className={styles.cell}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  checked={selectedItems.has(item.id)}
                  onChange={(e, data) => handleItemSelect(item, !!data.checked)}
                  style={{ opacity: 0.8 }}
                />
              </td>
              <td className={styles.cell}>
                {item.id}
              </td>
              <td className={styles.cell}>
                <div className={styles.iconCell}>
                  <span>▢</span>
                  <span>{item.title}</span>
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.assignee}>
                  <div
                    className={styles.avatar}
                    style={{
                      backgroundColor: '#d13438',
                    }}
                  >
                    {item.assignedTo.name.charAt(0)}
                  </div>
                  <span>Documents</span>
                </div>
              </td>
              <td className={styles.cell}>
                <div>
                  <span className={styles.statusDot}></span>
                  <span>{item.state}</span>
                </div>
              </td>
              <td className={styles.cell}>
                {item.areaPath}
              </td>
              <td className={styles.cell}>
                {item.tags && item.tags.join(', ')}
              </td>
              <td className={styles.cell}>
                <div className={styles.commentsCell}>
                  <span>💬</span>
                  <span>{item.comments}</span>
                </div>
              </td>
              <td className={styles.cell}>
                {item.activityDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkItemsTable;