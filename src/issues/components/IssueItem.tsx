import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks';
import { timeSince } from '../../helpers';

interface IssueItemProps{
    issue: Issue;
}

export const IssueItem: FC<IssueItemProps> = ({ issue }) => {

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const prefetchData = () => { // Con esto se hace prefetch de los datos de la issue y sus comentarios al hacer hover sobre el componente
        queryClient.prefetchQuery(
            ["issue", issue.number],
            () => getIssueInfo(issue.number),
        )
        queryClient.prefetchQuery(
            ["issue", issue.number, 'comments'],
            () => getIssueComments(issue.number),
        )
    }

    const preSetData = () => { // Con esto se hace set de los datos de la issue al hacer hover sobre el componente
        queryClient.setQueryData(
            ["issue", issue.number],
            () => getIssueInfo(issue.number),
        )
    }

    return (
        <div 
            className="card mb-2 issue" 
            onClick={ () => navigate(`/issues/issue/${ issue.number }`)} 
            onMouseEnter={ prefetchData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Closed
                    ? ( <FiCheckCircle size={30} color="green" /> ) 
                    : ( <FiInfo size={30} color="red" /> )
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">#{ issue.number } opened { timeSince(issue.created_at) } ago by {" "}<span className='fw-bold'>{ issue.user.login }</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span key={ label.id } className="badge rounded-pill me-1"
                                    style={{ backgroundColor: `#${ label.color }`, color: 'black', fontWeight: 'bold' }}
                                >{ label.name }</span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
