<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Y9c3rjz0LPL2A9YdJLLxI5toi8TXawmGPKJoEgos4+m30mq1n3O9HZTeNo/z6g8brR15KvNjd7QRpfE/Ve6ZmA==');
define('SECURE_AUTH_KEY',  'KApz787MbQhnm8npMsPmcrHFo+lEE95AOJKg8f0vcYQ2+TyJ8dCiH6vXYa93+3AR1LwhetyRvEJsLWrY/9MOLg==');
define('LOGGED_IN_KEY',    '8IAlQbBoDu7C+k2FFDZ0s6G2Aa1QxOLzZGc3iAHi6HxEU1HNE2VCPy+0zdNTPlRp0lTxsXVfcEiODKRJi7iUVw==');
define('NONCE_KEY',        '7nTdBLg5wd52rS6+htJnKu+v069nmosUJ7kCBWH//6qleoKR+klRKi72kqV/Z3QIve65DuZ9OWWCk20fbf8GJQ==');
define('AUTH_SALT',        'YBhsLeFoY8rJbKnNZNR0jAsJxJj9H803Tg7lPT3vWjV3/3S5wkSI5jXFP5wjE8A/rpDumAQFLlFxCknTNvYzgA==');
define('SECURE_AUTH_SALT', 'qGYu2KjBa5XssD4Xk7JcjMMqMYRwM7Q+AyCYFq+dDwxU+vlYbUIcySCvDINndmUSoYSKGCUGhh2R3suuzXCXJA==');
define('LOGGED_IN_SALT',   'ypNzKofpCw58CPNzcz0nvsptK5h6o31k4vb4XgpyZwRW+dGRjZla3AyYp0y7H6EZnBTOQRiXl+7Fp0LP581/+Q==');
define('NONCE_SALT',       '9eqSfzLf5b+JydKDNf5sFQkOlsFZlsv2cLJ3bTFj5R02we+6O1RTWAtHGp7q1KcrKipo5pWHuE6Tn4rq5qXoPQ==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
