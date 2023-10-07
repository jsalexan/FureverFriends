module.exports = {
  format_date: (date) => {
    if (date) {
      const originalDate = new Date(date);
            
      // Add one day (24 hours) to the date
      // originalDate.setDate(originalDate.getDate() + 1);

      const formattedDate = originalDate.toLocaleDateString();
      
      return formattedDate;
  }
  return ""; 
},
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
        return word;
    },
    json: function(context) {
        return JSON.stringify(context);
      }
};