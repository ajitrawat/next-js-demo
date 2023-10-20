import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../components/helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  // const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps(context){
  // const eventId= context.params.eventId
  const allEvents= await getAllEvents()
  return{
    props:{
      events:allEvents
    },
    revalidate:30
  }
}