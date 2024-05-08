```javascript
// HeaderBar Buttons
let headerButtons = [
  {
    text: 'About',
    itemKey: 'about',
    to: '/about',
    icon: <IconHelpCircle />
  }
];

if (localStorage.getItem('chat_link')) {
  headerButtons.splice(1, 0, {
    name: 'Chat',
    to: '/chat',
    icon: 'comments'
  });
}
```The Dropdown component provides a dropdown menu.<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      }
                    >
                      <Avatar size="small" color={stringToColor(userState.user.username)} style={{ margin: 4 }}>
                        {userState.user.username[0]}
                      </Avatar>
                      <span>{userState.user.username}</span>
                    </Dropdown>
                  </>
                  :
                  <>
                    <Nav.Item itemKey={'login'} text={'Login'} icon={<IconKey />} />
                    <Nav.Item itemKey={'register'} text={'Register'} icon={<IconUser />} />
                  </>
                }
              </>
            }
          >
          </Nav>
        </div>
      </Layout>
    </>
  );
};

export default HeaderBar;