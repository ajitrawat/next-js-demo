
export async function getAllEvents(){
 const response= await fetch('https://next-js-demo-46032-default-rtdb.firebaseio.com/events.json')
 const data = await response.json()

 //==firebace return data as obj so we need to transform it to array of obj
 const events=[]
 for(const key in data){
  events.push({id:key,...data[key]})
 }
 return events
}  

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    console.log("featured events---------",allEvents);

    return allEvents.filter((event) => event.isFeatured);
  }

  export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
  }

  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents()
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  } 