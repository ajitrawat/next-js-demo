import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFilteredEvents } from '../../components/helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  // we have made this is servierside rendering but now lets convert it to client side rendering
  // const{filteredEvents,numYear,numMonth}=props;    props derived from server side rendering
  const [loadedEvents,setLoadedEvents]= useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data,error}=useSWR('https://next-js-demo-46032-default-rtdb.firebaseio.com/events.json',fetcher);
  console.log("what is the data value",data);
  // const data={"e1":{"date":"2021-05-12","description":"Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.","image":"images/coding-event.jpg","isFeatured":false,"location":"Somestreet 25, 12345 San Somewhereo","title":"Programming for everyone"},"e2":{"date":"2021-05-30","description":"We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!","image":"images/introvert-event.jpg","isFeatured":true,"location":"New Wall Street 5, 98765 New Work","title":"Networking for introverts"},"e3":{"date":"2022-04-10","description":"You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.","image":"images/extrovert-event.jpg","isFeatured":true,"location":"My Street 12, 10115 Broke City","title":"Networking for extroverts"}}
  useEffect(()=>{
    if(data){
      const events=[]
      for(const key in data){
       events.push({id:key,...data[key]})
      }
      setLoadedEvents(events)
      console.log(" inside useEffect ",events);
    }
  },[data])

  if(!loadedEvents){
    return <p className='center'>loading...</p>
  }
  //=========server side code=============
  // if (!props) {
  //   return <p className='center'>Loading...</p>;
  // }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error  
  ) {
    console.log("rendered in client side-----------");
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }
//==========server side code ======================
  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className='center'>
  //         <Button link='/events'>Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });


  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
//==server side code =================
// export async function getServerSideProps(context){
//   const filterData=context.params;
//   console.log("is params -----------",filterData);

//   const filteredYear = filterData.slug[0];
//   const filteredMonth = filterData.slug[1];
//   console.log("is year true-----------",filteredYear);
//   console.log("is month true-----------",filteredMonth);
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     console.log("is error true-----------");
//     return {
//       props:{
//         hasError: true,
//       }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return{
//     props:{
//       filteredEvents:filteredEvents,
//       numYear:numYear,
//       numMonth:numMonth,
//     }
//   }
// }