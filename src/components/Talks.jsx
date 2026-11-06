import React, { useId, useState } from 'react';
import '../styles/PublicationsEvents.css';
import '../styles/Article.css';
import talkEntries from '../data/talks';
import { formatDisplayDate, getComparableTime } from '../utils/dateFormatter';
import useRevealOnScroll from '../utils/useRevealOnScroll';
import PageNav from './PageNav';

const typeDetails = {
  webinar: { icon: 'fa-video', label: 'Webinar', seriesLabel: 'Webinar series' },
  conference: { icon: 'fa-chalkboard-teacher', label: 'Conference', seriesLabel: 'Conference' },
};

const newestFirst = (a, b) => getComparableTime(b.date) - getComparableTime(a.date);

const latestDate = (entry) =>
  entry.events ? [...entry.events].sort(newestFirst)[0].date : entry.date;

const formatMeta = ({ date, venue }) =>
  [formatDisplayDate(date), venue].filter(Boolean).join(' · ');

const TypeBadge = ({ type, label }) => (
  <div className={`work-type-badge work-type-${type}`}>
    <i className={`fas ${typeDetails[type].icon}`} aria-hidden="true"></i>
    <span>{label}</span>
  </div>
);

const Metrics = ({ metrics }) =>
  metrics?.length > 0 && (
    <ul className="work-metrics">
      {metrics.map((metric) => (
        <li key={metric.value} className="work-metric">
          <i className={`fas ${metric.icon}`} aria-hidden="true"></i>
          <span>{metric.value}</span>
        </li>
      ))}
    </ul>
  );

const OneOffTalk = ({ talk }) => (
  <a href={talk.link} target="_blank" rel="noopener noreferrer" className="essay-item">
    <div className="essay-heading">
      <h3 className="essay-title">{talk.title}</h3>
      <TypeBadge type={talk.type} label={typeDetails[talk.type].label} />
    </div>
    <p className="essay-dek">{talk.description}</p>
    <Metrics metrics={talk.metrics} />
    <p className="essay-meta">{formatMeta(talk)}</p>
  </a>
);

const TalkEvent = ({ event }) => (
  <li className="talk-event">
    <p className="essay-meta">{formatMeta(event)}</p>
    <h4 className="talk-event-title">{event.title}</h4>
    {event.originalTitle && <p className="talk-event-original">{event.originalTitle}</p>}
    <p className="talk-event-description">{event.description}</p>
    <Metrics metrics={event.metrics} />
    {(event.link || event.programme || event.recording) && (
      <div className="talk-event-links">
        {event.link && (
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="work-recording-link">
            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            <span>Event page</span>
          </a>
        )}
        {event.programme && (
          <a href={event.programme} target="_blank" rel="noopener noreferrer" className="work-recording-link">
            <i className="fas fa-file-alt" aria-hidden="true"></i>
            <span>Programme</span>
          </a>
        )}
        {event.recording && (
          <a href={event.recording} target="_blank" rel="noopener noreferrer" className="work-recording-link">
            <i className="fas fa-play-circle" aria-hidden="true"></i>
            <span>Watch recording</span>
          </a>
        )}
      </div>
    )}
  </li>
);

// The event panel is always rendered (hidden while closed) so its content is
// part of the prerendered HTML.
const TalkGroup = ({ group }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`talk-group${open ? ' is-open' : ''}`}>
      <div className="talk-group-header">
        <div className="essay-heading">
          <h3 className="essay-title">
            <button
              type="button"
              className="talk-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(!open)}
            >
              <span>{group.title}</span>
              <i className="fas fa-chevron-down talk-toggle-icon" aria-hidden="true"></i>
            </button>
          </h3>
          <TypeBadge type={group.type} label={typeDetails[group.type].seriesLabel} />
        </div>
        {group.originalTitle && <p className="essay-dek essay-original">{group.originalTitle}</p>}
        <p className="essay-dek">{group.description}</p>
        {(group.link || group.playlist) && (
          <div className="talk-group-links">
            {group.link && (
              <a href={group.link} target="_blank" rel="noopener noreferrer" className="work-recording-link">
                <span>Conference website</span>
                <i className="fas fa-external-link-alt" aria-hidden="true"></i>
              </a>
            )}
            {group.playlist && (
              <a href={group.playlist} target="_blank" rel="noopener noreferrer" className="work-recording-link">
                <i className="fas fa-play-circle" aria-hidden="true"></i>
                <span>Watch all recordings</span>
              </a>
            )}
          </div>
        )}
      </div>
      <ol id={panelId} className="talk-events" hidden={!open}>
        {[...group.events].sort(newestFirst).map((event) => (
          <TalkEvent key={event.title} event={event} />
        ))}
      </ol>
    </div>
  );
};

const Talks = () => {
  const sectionRef = useRevealOnScroll();
  const entries = [...talkEntries].sort(
    (a, b) => getComparableTime(latestDate(b)) - getComparableTime(latestDate(a))
  );

  return (
    <>
      <section className="publications-events" ref={sectionRef}>
        <h2>Talks</h2>
        <p className="talks-intro">
          I organise and host IDA AI&rsquo;s Kod med AI webinar series and help organise IDA&rsquo;s
          Driving AI and Driving IT conferences.
        </p>
        <div className="essays-list">
          {entries.map((entry) =>
            entry.events ? (
              <TalkGroup key={entry.title} group={entry} />
            ) : (
              <OneOffTalk key={entry.title} talk={entry} />
            )
          )}
        </div>
      </section>
      <PageNav />
    </>
  );
};

export default Talks;
