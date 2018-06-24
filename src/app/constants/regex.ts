export class Regex {
	public static hostname = /^(?:https?:\/\/)((?:[a-z0-9-_]+\.)*[a-z0-9-_]+\.?)(.*)$/i;
	public static itunes = /^(?:https?:\/\/)?((?:[a-z0-9-_]+\.)*[a-z0-9-_]+\.?)(\/)([a-z]{2})(.*)(\/[a-z]*)(.*)(\?.*)$/i;
	public static vgmdb = /^(?:https?:\/\/)?((?:[a-z0-9-_]+\.)*[a-z0-9-_]+\.?)(\/)(.*)(\/)(.*)$/i;
}