import { getFeaturedEvents } from '../components/helpers/api-utils';
import EventList from '../components/events/event-list';

function HomePage(props) {
  

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  console.log("events api",featuredEvents);
  return{
    props:{
      events:featuredEvents
    },
    revalidate:1800
  }
}
