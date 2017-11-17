import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import RenderComponentBody from './RenderComponentBody'

const renderBackBtn = () => (
    <Link to={'/'}>
        <IconButton iconStyle={{ color: '#fff' }}>
            <NavigationClose />
        </IconButton>
    </Link>
)

// eslint-disable-next-line
const renderComponent = ({ path, name, component }) => {
    return (
        <Card key={path} style={{ margin: 20 }} initiallyExpanded>
            <CardHeader
              title={<h4>{name}</h4>}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
                <RenderComponentBody component={component} />
            </CardText>
            <CardActions>
                <Link to={path}>
                    <RaisedButton
                      primary
                      label={'Open component alone'}
                      fullWidth
                    />
                </Link>
            </CardActions>
        </Card>
    )
}

const RenderAllScreen = ({ components }) => (
    <div>
        <AppBar
          title="Styleguide :: All Components"
          iconElementLeft={renderBackBtn()}
        />

        {components.map(renderComponent)}

    </div>
)

RenderAllScreen.propTypes = {
    components: PropTypes.array.isRequired, // eslint-disable-line
}

export default RenderAllScreen
