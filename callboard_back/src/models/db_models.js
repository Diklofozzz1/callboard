import { Sequelize, DataTypes } from 'sequelize';

const Connect = new Sequelize(
    'vkr_db',
    'postgres',
    'gqallxxx79311',
    {
        dialect: 'postgres',
        host: '127.0.0.1',
        port: '5432',
        logging: false
    }
);

const User = Connect.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }
);

//------------------------------ Chat -------------------------------

const Chat = Connect.define(
    'Chat',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    }
);

Chat.belongsTo(User, {
        foreignKey: {
            name: 'user1_id',
            allowNull: false
        }
    }
)

Chat.belongsTo(User, {
        foreignKey: {
            name: 'user2_id',
            allowNull: false
        }
    }
)

//------------------------------/Chat/-------------------------------

//------------------------------ Message -------------------------------

const Message = Connect.define(
    'Message',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        msg_text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

Message.belongsTo(User, {
        foreignKey: {
            name: 'user_id',
            allowNull: false
        }
    }
)

Message.belongsTo(Chat, {
        foreignKey: {
            name: 'chat_id',
            allowNull: false
        }
    }
)

//------------------------------/Message/-------------------------------

//------------------------------ Comments -------------------------------

const Comments = Connect.define(
    'Comments',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);

Comments.belongsTo(User, {
        foreignKey: {
            name: 'created_by',
            allowNull: false
        }
    }
)

Comments.belongsTo(User, {
        foreignKey: {
            name: 'linked_to_user',
            allowNull: false
        }
    }
)


//------------------------------/Comments/-------------------------------

//------------------------------ Category ---------------------------------

const Category = Connect.define(
    'Category',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

//------------------------------/Category/---------------------------------

//------------------------------ Announcement ---------------------------

const Announcement = Connect.define(
    'Announcement',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_auction: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        begin: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        end: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        complated: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    }
);

Announcement.belongsTo(User, {
        foreignKey: {
            name: 'created_by',
            allowNull: false
        }
    }
)

Announcement.belongsTo(Category, {
        foreignKey: {
            name: 'category',
            allowNull: true
        }
    }
)

//------------------------------/Announcement/---------------------------

//------------------------- AnnouncementPhoto ---------------------------

const AnnouncementPhoto = Connect.define(
    'AnnouncementPhoto',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        photo_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        hash_name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

AnnouncementPhoto.belongsTo(Announcement, {
        foreignKey: {
            name: 'announcement_id',
            allowNull: false
        }
    }
)

//-------------------------/AnnouncementPhoto/---------------------------



export default Connect;
