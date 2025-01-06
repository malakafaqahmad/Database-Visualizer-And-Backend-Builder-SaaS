const extractSQLCode = (text) => {
    // Regular expression to match multi-line SQL statements
    const sqlPattern = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|MERGE|WITH)\b[\s\S]*?;/gi;

    // Extracting matches
    const matches = text.match(sqlPattern);

    // If matches found, return them as a single SQL code string
    if (matches && matches.length > 0) {
        return matches.map(match => match.trim()).join('\n');
    } else {
        return "null";
    }
}

export default extractSQLCode;


