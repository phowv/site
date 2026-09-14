export const AccessModifier = {
	private: "private",
	protected: "protected",
	public: "public",
} as const;

export type AccessModifier = (typeof AccessModifier)[keyof typeof AccessModifier];