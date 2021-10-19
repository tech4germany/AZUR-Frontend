const Table = {
  baseStyle: {
    table: {
      display: "inline-block",
      maxWidth: "100%",
      width: "auto",
      overflowX: "scroll",
      borderCollapse: "collapse",
    },
    th: {
      textAlign: "center",
      textTransform: "none",
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
      td: {
        fontSize: "md",
      },
      th: {
        fontSize: "md",
      },
    },
    lg: {
      table: {
        fontSize: "lg",
      },
      td: {
        fontSize: "lg",
      },
      th: {
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
