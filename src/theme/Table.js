const Table = {
  baseStyle: {
    table: {
      display: "inline-block",
      width: "100%",
      overflowX: "scroll",
      borderCollapse: "collapse",
    },
    th: {
      textAlign: "center",
    },
    td: {
      textAlign: "center",
      fontWeight: "normal",
    },
  },
  sizes: {
    md: {
      table: {
        fontSize: "md",
      },
    },
    lg: {
      table: {
        fontSize: "lg",
      },
    },
  },
  variants: {
    stickyHeader: {
      thead: {
        position: "sticky",
        top: "0",
        backgroundColor: "white",
      },
    },
  },
  defaultProps: { size: "md" },
};

export default Table;
